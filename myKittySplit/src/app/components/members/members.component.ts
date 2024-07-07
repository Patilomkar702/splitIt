import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild, ViewRef } from '@angular/core';
import { Expense } from 'src/app/models/expense.model';
import { Member } from 'src/app/models/member.model';
import { KittySplitService } from 'src/app/services/kitty-split.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members:Member[]=[];
  isAddBtnDisabled=true;
  showAddMemberBox=false;
  message = "Member is non deletable since it is included in Expense.Please remove it from Expenses";
  @HostListener('#modalBtn') 
  modalBtn: ElementRef<HTMLButtonElement> | undefined ;

  constructor(public kittsplitSer:KittySplitService) { 
  }

  ngOnInit(): void {
    this.members = this.kittsplitSer.memberList;
    this.kittsplitSer.newMemberAddedObserver.subscribe((val)=>{
      this.members = this.kittsplitSer.memberList;
      console.log(this.members);
    })
    if(this.members.length==0){
      this.showAddMemberBox=true;
    }
  }

  validateName(name:string){
    if(name.length>2){
      this.isAddBtnDisabled = false;
    }
  }

  addMember(name:string){
    this.kittsplitSer.addMember(name);
    this.showAddMemberBox=false;
    this.isAddBtnDisabled = true;
  }



  delMember(id:number){
    let isDeletable = true;
    this.kittsplitSer.expenseList.forEach((ele)=>{
      if(ele && ele.payeeId == id){
        isDeletable = false;
      }
      let includedIDs:any[]|undefined = ele.includedMembersID;
      if(includedIDs?.length){
        includedIDs.forEach((indID)=>{
          if(indID==id){
            isDeletable = false;
          }
        })
      }
    });

    if(isDeletable){
      this.kittsplitSer.delMember(id);
    }else{
      let member:any = this.kittsplitSer.getMemberByID(id)?.name;
      this.message = this.message.replace("Member",member);
      let element:HTMLButtonElement = document.getElementById("modalBtn") as HTMLButtonElement;
      element.click();
    }
    if(this.members.length==0){
      this.showAddMemberBox=true;
    }
  }
  

}
