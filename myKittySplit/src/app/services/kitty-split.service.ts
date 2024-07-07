import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Subject } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class KittySplitService {

  memberList:Member[]=[];
  expenseList:Expense[]=[];
  newMemberAddedObserver:Subject<any>=new Subject();
  newExpenseAddedObserver:Subject<any>=new Subject();
  settleMentList:{name:any,paidTo:any,amount:any}[]=[];
  totalCost =  0 ;

  constructor() { 
    this.addMember("Jack");
    this.addMember("Oggy");
    // this.addMember("James");
    // this.addMember("Omkar");
    // this.addMember("AMit");
    this.addExpense("Tea and coffee",500,'Jack1',['Jack1','Oggy2']);
    // this.addExpense("Tea and coffee2",1500,'Jack1',['Jack1','Oggy2']);
    // this.addExpense("Drinks",5000,'James3',['Omkar4','Oggy2','AMit5']);

  }

  addMember(name:string){
    let obj = new Member();
    obj.id = name + (this.memberList.length+1);
    obj.name = name;
    this.memberList.push(obj);
    this.newMemberAddedObserver.next(true);
  }

  addExpense(tittle:any,amt:number,payeeID:any,incledMembsId:any[]){
    let exp = new Expense();
    exp.id = payeeID+(this.expenseList.length+1);
    exp.title = tittle;
    exp.amount = amt;
    exp.payeeId = payeeID;
    exp.includedMembersID = incledMembsId;
    exp.share = exp.amount/exp.includedMembersID.length;
    this.expenseList.push(exp); 
    this.newMemberAddedObserver.next(true);
  }

  delMember(id:any){
    this.memberList.splice(this.memberList.findIndex((res)=>res.id==id),1);
  }

  delExpense(id:any){
    this.expenseList.splice(id,1);
  }

  getMemberByID(id:any):Member|undefined{
    return this.memberList.find((res)=>res.id==id);
  }

  getIncluedMembersList(idsArr:any[]):string{
    let names = "";
    let count = 0;
    let notMembers = "";
    for(let id of idsArr){
      names += " "+ this.getMemberByID(id)?.name;
      count++;
    }
    if(count==this.memberList.length){
      names = "Everyone";
    }
    return names;
  }

  calculateExpense(){
    this.totalCost = 0;
    this.settleMentList = [];
    this.expenseList.forEach((expense)=>{
      this.totalCost += expense.amount;
    })
    this.memberList.forEach((member)=>{
      member.owned=0;
      member.spent=0;
      member.share=0;
      this.expenseList.forEach(expense=>{
        if(expense.payeeId==member.id){
          member.spent += expense.amount;
        }
        if(expense.includedMembersID.includes(member.id)){
          member.share += expense.share;
        }
      })
      member.owned = member.spent - member.share;
    })
    this.memberList.sort((a,b)=>b.owned-a.owned)
    this.memberList.forEach((member,idx,memberList)=>{
      if(member.owned>0){   //1000
        for(let i=idx+1;i<memberList.length;i++){
          if(memberList[i].owned<0 && member.owned>0){  
            let amount =  memberList[i].owned;                //-700
            let diff = member.owned + memberList[i].owned;    //300
            if(diff>=0){
              member.owned = diff;
              memberList[i].owned = 0;
              this.settleMentList.push({
                name: memberList[i].name, paidTo: member.name,
                amount: Math.round(Math.abs(amount))
              })
            }
            if(diff<0){
              amount = member.owned;
              member.owned = 0;
              memberList[i].owned = diff;
              this.settleMentList.push({
                name: memberList[i].name, paidTo: member.name,
                amount: Math.round(Math.abs(amount))
              })
            }
          }
        }
      }
    })
    
  }
}



