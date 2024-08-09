import {
  Column,
  Entity,
  Index, ManyToOne, OneToMany,
  RelationId,
} from 'typeorm/index';
import UserExt from './UserExt'
import Wallet from './Wallet'
import MemberRole from './MemberRole'
import Club from './Club'
import Member from './Member'
import MemberBadge from './MemberBadge'
import {ClubeeoPrimaryColumn} from '../lib/modelCommon';
import UserModel from '../core/domains/user/UserModel';

@Entity()
export default class User extends UserModel {

  @ClubeeoPrimaryColumn()
  id: string;

  @Column({type: String, default: ''})
  imgUrl: string;

  @Column({type: Boolean, default: false})
  confirmed: boolean;

  @Column({nullable: true})
  @Index({unique: true})
  confirmationSecret: string;

  @Column({nullable: true})
  @Index({unique: true})
  changePasswordSecret: string;

  @Column({nullable: true})
  changePasswordCreatedAt: Date;

  @Column({type: String, default: ''})
  lang: string;

  @OneToMany(() => Member, rel => rel.user)
  memberships: Member[];

  @OneToMany(() => MemberRole, rel => rel.user)
  userClubRoles: MemberRole[];

  @OneToMany(() => MemberBadge, rel => rel.user)
  badges: MemberBadge[];

  @OneToMany(() => UserExt, rel => rel.user)
  userExts: UserExt[];

  @OneToMany(() => Wallet, rel => rel.user)
  wallets: Wallet[];

  @ManyToOne(() => Club)
  activeClub: Club;
  @RelationId((self: User) => self.activeClub)
  activeClubId: string;

}
