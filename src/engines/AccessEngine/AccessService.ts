import { In } from 'typeorm';
import { AccessMemberContext } from "./AccessMemberContext";
import { TExeContainer } from "../../core/exeInterfaces";
import ClubRole from "../../models/ClubRole";
import MemberRole from "../../models/MemberRole";

interface IMember {
  id: string,
  clubId: string,
}

interface IClub {
  id: string,
}

/**
 * AccessService - contains the business logic for the AccessService.
 */
export class AccessService<T extends TExeContainer> {
  constructor(public c: T) {
  }

  memberCtx<TMember extends IMember, TClub extends IClub>(member: TMember, club: TClub) {
    return new AccessMemberContext(this, member, club);
  }

  async hasRole(member: IMember, club: IClub, roleSlug: string) {
    if (!member || !club) return false;

    const memberRole = await this.c.m.findOneBy('MemberRole', {
      member: {id: member.id},
      club: {id: club.id},
      clubRole: {
        club: {id: club.id},
        name: roleSlug,
      },
      enabled: true,
    });

    return !!memberRole;
  }

  async getRolesMap<T extends string>(member: IMember, club: IClub, roleSlugs: T[]): Promise<Record<T, boolean>> {
    if (!member || !club) roleSlugs.reduce((acc, roleSlug) => {
      acc[roleSlug] = false;
      return acc;
    }, {} as Record<T, boolean>);

    const memberRoles = await this.c.m.find(MemberRole, {
      where: {
        member: {id: member.id},
        club: {id: club.id},
        clubRole: {
          club: {id: club.id},
          name: In(roleSlugs),
        },
        enabled: true,
      },
      relations: ['clubRole'],
    });

    return roleSlugs.reduce((acc, roleSlug) => {
      acc[roleSlug] = !!memberRoles.find(mr => mr.clubRole?.name === roleSlug);
      return acc;
    }, {} as Record<T, boolean>);
  } 

  async addRole(member: IMember, club: IClub, roleSlug: string) {
    if (!member || !club) return false;

    const clubRole = await this.c.m.findOneBy(ClubRole, {
      club: {id: club.id},
      name: roleSlug,
    });

    if (!clubRole) return false;

    await this.c.em.createOrUpdateBy(MemberRole, {
      member: {id: member.id},
      club: {id: club.id},
      clubRole: {id: clubRole.id},
    }, {
      enabled: true,
    });

    return true;
  }

  async removeRole(member: IMember, club: IClub, roleSlug: string) {
    if (!member || !club) return false;

    const clubRole = await this.c.m.findOneBy(ClubRole, {
      club: {id: club.id},
      name: roleSlug,
    });

    if (!clubRole) return false;

    await this.c.em.updateIfExistBy(MemberRole, {
      member: {id: member.id},
      club: {id: club.id},
      clubRole: {id: clubRole.id},
    }, {
      enabled: false,
    });

    return true;
  }

}