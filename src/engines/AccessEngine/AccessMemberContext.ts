import { AccessService } from './AccessService';
import { TExeContainer } from '../../core/exeInterfaces';

interface IMember {
  id: string,
  clubId: string,
}

interface IClub {
  id: string,
}

export class AccessMemberContext<T extends TExeContainer, TMember extends IMember, TClub extends IClub> {
  constructor(public service: AccessService<T>, public member: TMember, public club: TClub) {

    if (!member?.id) throw new Error('Member has no id');
    if (!club?.id) throw new Error('Club has no id');
    if (!member?.clubId) throw new Error('Member has no clubId');
    if (member.clubId !== club.id) throw Error('Member does not belong to the club');
  }

  get clubId() {
    return this.club.id;
  }

  get memberId() {
    return this.member.id;
  }

  async hasRole(
    roleSlug: string,
  ) {
    return await this.service.hasRole(this.member, this.club, roleSlug);
  }

  async getRolesMap<T extends string>(roleSlugs: T[]) {
    return await this.service.getRolesMap<T>(this.member, this.club, roleSlugs);
  }

  async addRole(roleSlug: string) {
    return await this.service.addRole(this.member, this.club, roleSlug);
  }

  async removeRole(roleSlug: string) {
    return await this.service.removeRole(this.member, this.club, roleSlug);
  }
}