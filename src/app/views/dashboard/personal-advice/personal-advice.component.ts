import { Component, OnInit, ViewChild } from '@angular/core';
import { AppserviceService } from '../../../appservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { baseMediaUrl } from '../../../../assets/BaseURL.js';
import { from } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-personal-advice',
  templateUrl: './personal-advice.component.html',
  styleUrls: ['./personal-advice.component.css']
})
export class PersonalAdviceComponent implements OnInit {
  public notiy;
  public p;
  modalRefHistory: any;
  @ViewChild('confirm', { static: false }) confirm;
  deleteUserPersonal: any;
    constructor(public service:AppserviceService,public router:Router,
      private route: ActivatedRoute, public spinner : NgxSpinnerService,public modalService: ModalManager,) { }
  public AllUsers:any;
    ngOnInit(): void {


  this.getAllAppUsers();
    }
  public getAllAppUsers=()=>{
    this.spinner.show();
    let x={
      user_id:localStorage.getItem('user_id'),
      auth_token:localStorage.getItem('auth_token')
    }
   this.service.getAllAppUser(x).subscribe((res:any)=>{
      this.AllUsers=res.data;
    console.log(res);
    this.spinner.hide();
   })

  }
  goChat=(data)=>{
     console.log(data);
    this.router.navigate(['/dashboard/Chat' ,{ id: data.app_user_id}]);
  }

  GotoNofi(){
    this.router.navigate(['/dashboard/publishnotification'])
  }

public DelUserPersonalAdv = () =>{
  let x = {
    user_id : localStorage.getItem('user_id'),
    auth_token : localStorage.getItem('auth_token'),
    app_user_id : this.deleteUserPersonal
  };
  console.log(x);
  this.service.DelUserPersonalAdv(x).subscribe((res:any)=>{
      console.log(res);
      this.cancelConfirm();
      this.getAllAppUsers();
  });
}

cancelConfirm=()=>{
  this.modalService.close(this.modalRefHistory);
}
public openModalConfirm = (obj) => {

  this.deleteUserPersonal = obj.app_user_id

  this.modalRefHistory = this.modalService.open(this.confirm, {
    size: "sm",
    modalClass: "mymodal",
    hideCloseButton: false,
    centered: false,
    backdrop: true,
    animation: true,
    keyboard: false,
    closeOnOutsideClick: true,
    backdropClass: "modal-backdrop",

  })

}

}
