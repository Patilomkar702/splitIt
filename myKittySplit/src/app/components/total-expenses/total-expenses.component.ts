import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense.model';
import { Member } from 'src/app/models/member.model';
import { KittySplitService } from 'src/app/services/kitty-split.service';

@Component({
  selector: 'app-total-expenses',
  templateUrl: './total-expenses.component.html',
  styleUrls: ['./total-expenses.component.css']
})
export class TotalExpensesComponent implements OnInit {

  expenses:Expense[]=[];
  members:Member[]=[];
  totalCost:any;
  constructor(public kittySer:KittySplitService) { }

  ngOnInit(): void {
    this.kittySer.calculateExpense();
    this.expenses = this.kittySer.expenseList;
    this.members = this.kittySer.memberList;
    this.totalCost = this.kittySer.totalCost;
    // this.expenses.forEach.
    console.log(this.expenses);
    console.log(this.members);
    console.log(this.kittySer.settleMentList);
    
  }

}
