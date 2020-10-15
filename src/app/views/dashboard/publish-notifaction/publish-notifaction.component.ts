import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../../../appservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { baseMediaUrl } from '../../../../assets/BaseURL.js';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalManager } from 'ngb-modal';
@Component({
  selector: 'app-publish-notifaction',
  templateUrl: './publish-notifaction.component.html',
  styleUrls: ['./publish-notifaction.component.css']
})
export class PublishNotifactionComponent implements OnInit {
  modalRefHistory: any;
  @ViewChild('confirm', { static: false }) confirm;
  deleteOpinion: any;

  constructor(public route: ActivatedRoute, public service: AppserviceService,
    public fb: FormBuilder, public notifierService: NotifierService, public spinner: NgxSpinnerService,
    public modalService: ModalManager,) {
    this.notifier = notifierService;
  }
  public MessageForm: FormGroup;
  public notifier;
  public Messages: any;
  public Images_base_Url = baseMediaUrl;
  public File_As_message: any;
  public User_placeHolder_img = baseMediaUrl + 'uploads/app_users.png';
  public AdminImage_placeHolder = baseMediaUrl + 'uploads/admin_user.png';
  public App_user_id: any;
  public Validator = false;
  ngOnInit(): void {
    this.getUserConve();
    this.MessageForm = this.fb.group({
      MessageBody: ''
    });
  }

  public getUserConve = () => {
    this.spinner.show();
    const a = {
      user_id: localStorage.getItem('user_id'),
      auth_token: localStorage.getItem('auth_token')
    };
    this.service.GetAllPublicMessagesAdmin(a).subscribe((res: any) => {
      //   console.log(res);
      this.Messages = res.data;
      console.log(this.Messages);
      this.spinner.hide();
    });
  }
  public DateCreater(data) {
    return data.replace(' ', '  |  ');

  }
  messageFile = (event) => {
    this.Validator = false;
    const _validFileExtensions = ['image/png', 'image/jpeg', 'image/bmp', 'image/gif'
      , 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];

    for (let i = 0; i <= 5; i++) {
      if (event.target.files[0].type === _validFileExtensions[i]) {
        console.log('File is Valid');
        this.Validator = true;
      }
    }
    if (this.Validator === false) {
      console.log('InValied File Type');

      this.notifier.notify('error', 'Wrong File Type Please Select PNG JPEG GIF Doc PDF Type');
    }
    console.log(event.target.files[0].type);
    this.File_As_message = event.target.files[0];

  }
  sendMessage = () => {

    const body = this.MessageForm.controls['MessageBody'].value;
    if (body === '' && this.File_As_message == null) {
      this.notifier.notify('error', 'Can Not Send Empty Message');
      return;
    }
    let x;
    if (body === '' && this.Validator === false) {

      this.notifier.notify('error', 'Wrong File Type Please Select PNG JPEG GIF Doc PDF Type');
      alert('please Select Valid File Types');
      return;
    } else if (body === '' && this.File_As_message != null) {
      x = {
        user_id: localStorage.getItem('user_id'),
        auth_token: localStorage.getItem('auth_token'),
        //   user_id_sender:localStorage.getItem('user_id'),
        //   user_id_receiver:this.App_user_id,
        //   app_user_id:this.App_user_id,
        message_body: body,
        user_type: 'admin',
        message_type: 'file',
        mes_attachment: this.File_As_message
      };


    // tslint:disable-next-line: triple-equals
    } else if (body != '' ) {
      x = {
        user_id: localStorage.getItem('user_id'),
        auth_token: localStorage.getItem('auth_token'),
        //   user_id_sender:localStorage.getItem('user_id'),
        //   user_id_receiver:this.App_user_id,
        //   app_user_id:this.App_user_id,
        message_body: body,
        user_type: 'admin',
        message_type: 'file',
        mes_attachment: this.File_As_message
      };

    } else {
      x = {
        user_id: localStorage.getItem('user_id'),
        auth_token: localStorage.getItem('auth_token'),
        //   user_id_sender:localStorage.getItem('user_id'),
        //   user_id_receiver:this.App_user_id,
        //   app_user_id:this.App_user_id,
        message_body: body,
        user_type: 'admin',
        message_type: 'file',
        mes_attachment: this.File_As_message
      };
      alert('image required');
    }
    console.log(x);
    const a = this.getFormData(x);
    this.service.CreatePublicMessage(a).subscribe((res: any) => {
      console.log(res);

      this.ResetMessage();
      this.getUserConve();


    });
  }
  ResetMessage = () => {
    this.MessageForm.reset();
    this.File_As_message = null;
    this.Validator = false;
  }
  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }

  goToLink(data) {
    console.log(data);
    window.open(this.Images_base_Url + data, '_blank');
  }

  public DelPublicMessage = ()=>{
     let x = {
      user_id: localStorage.getItem('user_id'),
      auth_token: localStorage.getItem('auth_token'),
      message_id : this.deleteOpinion
     };
     console.log(x);
     this.service.DelPublicMessage(x).subscribe((res)=>{
      console.log(res);
      this.cancelConfirm();
      this.getUserConve();
     });
  }

  cancelConfirm=()=>{
    this.modalService.close(this.modalRefHistory);
  }

  public openModalConfirm = (obj) => {

    this.deleteOpinion = obj.message_id

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
