import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Expense } from 'src/app/models/expense.model';
import { Member } from 'src/app/models/member.model';
import { KittySplitService } from 'src/app/services/kitty-split.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  members:Member[]=[];
  expenses:Expense[]=[];
  isAddExpenseDisabled = true;
  showAddMemberBox=false;
  showErrror=false;

  constructor(public kittsplitSer:KittySplitService,public router:Router) { 
  }

  ngOnInit(): void {
    this.members = this.kittsplitSer.memberList;
    this.kittsplitSer.newMemberAddedObserver.subscribe((val)=>{
      this.members = this.kittsplitSer.memberList;
    })

    this.expenses = this.kittsplitSer.expenseList;
    this.kittsplitSer.newExpenseAddedObserver.subscribe((val)=>{
      this.expenses = this.kittsplitSer.memberList;   
    })
    if(this.expenses.length==0){
      this.showAddMemberBox = true;
    }
    if(this.members.length==0){
      this.router.navigateByUrl("member");
    }
  }


  includedMembers(item:Member){
    let idx = this.members.findIndex((res)=>res.id==item.id);
    this.members[idx].isIncludedExpense=!this.members[idx].isIncludedExpense;
    console.log(this.members);
    
  }


  

  addExpense(expense:any,amount:any,payee:any){
    let includePeoples = [];
    for(let member of this.members){
      if(member.isIncludedExpense){
        includePeoples.push(member.id);
      }
    }
    if(expense && amount && payee && includePeoples.length>0){
      this.kittsplitSer.addExpense(expense,+amount,payee,includePeoples);
      this.resetMembers();
      this.showAddMemberBox=false;
    }else{
      this.showErrror=true;
      setInterval(()=>{
        this.showErrror=false;
      },5000)
    }
   
  }

  resetMembers(){
    this.members.forEach((ele)=>{
      ele.isIncludedExpense=true; 
    })
  }

  deleteExpense(idx:number){
    this.kittsplitSer.delExpense(idx);
    if(this.members.length==0){
      this.router.navigateByUrl("member");
    }else if(this.expenses.length==0){
      this.showAddMemberBox=true;
    }
  }

}


