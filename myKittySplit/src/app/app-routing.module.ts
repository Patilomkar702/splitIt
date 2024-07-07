import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { MembersComponent } from './components/members/members.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { TotalExpensesComponent } from './components/total-expenses/total-expenses.component';

const routes: Routes = [
  { path: '', redirectTo: 'member', pathMatch: 'full' },
  { path: 'member', component: MembersComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'total', component: TotalExpensesComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'adds', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }