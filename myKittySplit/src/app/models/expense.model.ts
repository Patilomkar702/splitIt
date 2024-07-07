import { Member } from "./member.model";

export class Expense {
  id?: any;
  title?: string;
  amount?:number | undefined | any;
  payeeId?: any | undefined;
  includedMembersID?:any[] | any;
  share?:number;
}