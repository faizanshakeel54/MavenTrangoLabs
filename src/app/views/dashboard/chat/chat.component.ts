import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../../../appservice.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { baseMediaUrl } from '../../../../assets/BaseURL.js';
import { from } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public route:ActivatedRoute,public service:AppserviceService,
    public fb:FormBuilder,public notifierService: NotifierService, public spinner : NgxSpinnerService) {
      this.notifier = notifierService;
    }
  public MessageForm:FormGroup;
  public notifier;
  public Messages:any;
  public Images_base_Url= baseMediaUrl;
  public File_As_message:any;
  public User_placeHolder_img= baseMediaUrl+'uploads/app_users.png'
  public AdminImage_placeHolder= baseMediaUrl+"uploads/admin_user.png"
  public App_user_id:any;


  ngOnInit(): void {
    // setTimeout(() => {}, 5000);
    this.getUserConve()
  this.MessageForm=this.fb.group({
    MessageBody:''
  })
};

  public getUserConve=()=>{

    this.spinner.show();
    let x;
    this.route.paramMap.subscribe(params => {
     x = params.get("id")
     this.App_user_id=x
    });
    console.log(x);
    let a={
      user_id:localStorage.getItem('user_id'),
      auth_token:localStorage.getItem('auth_token'),
      app_user_id:x
    }
    this.service.GetConversationByUser(a).subscribe((res:any)=>{
     // console.log(res);
      this.Messages=res.data;
      console.log(this.Messages);
      this.spinner.hide();
    })
  }
 public DateCreater(data){
   return data.replace(" ","  |  ")

  }
  public Validator=false;
  messageFile=(event)=>{
    this.Validator=false;
    let _validFileExtensions = ["image/png", "image/jpeg", "image/bmp", "image/gif"
    ,"application/vnd.openxmlformats-officedocument.wordprocessingml.document" ,"application/pdf"];

    for(let i=0;i<=5;i++){
      if(event.target.files[0].type==_validFileExtensions[i]){
        console.log("File is Valed");
       this.Validator=true;
      }
    }
    if(this.Validator==false){
      console.log("InValied File Type");

      this.notifier.notify("error","Wrong File Type Please Select PNG JPEG GIF Doc PDF Type")
    }
    console.log(event.target.files[0].type)
    this.File_As_message=event.target.files[0];

  }
  sendMessage=()=>{
    let body=this.MessageForm.controls['MessageBody'].value
    if(body=='' && this.File_As_message==null ){
      this.notifier.notify("error","Can Not Send Empty Message");
      return ;
    }
    let x;
    if(body=='' && this.Validator==false){

        this.notifier.notify("error","Wrong File Type Please Select PNG JPEG GIF Doc PDF Type")
        return;
    }
    else if(body=="" && this.File_As_message!=null){
      x={
        user_id:localStorage.getItem('user_id'),
        auth_token:localStorage.getItem('auth_token'),
        user_id_sender:localStorage.getItem('user_id'),
        user_id_receiver:this.App_user_id,
        app_user_id:this.App_user_id,
        message_body:body,
        user_type :'admin',
        message_type:'file',
        doc_attachment:this.File_As_message
    }
    }
    else if(body!="" && this.File_As_message!=null){
      x={
        user_id:localStorage.getItem('user_id'),
        auth_token:localStorage.getItem('auth_token'),
        user_id_sender:localStorage.getItem('user_id'),
        user_id_receiver:this.App_user_id,
        app_user_id:this.App_user_id,
        message_body:body,
        user_type :'admin',
        message_type:'file',
        doc_attachment:this.File_As_message
    }
    }
    else{
     x={
      user_id:localStorage.getItem('user_id'),
      auth_token:localStorage.getItem('auth_token'),
        user_id_sender:localStorage.getItem('user_id'),
        user_id_receiver:this.App_user_id,
        app_user_id:this.App_user_id,
        message_body:body,
        user_type :'admin',
        message_type:'text',
        doc_attachment:this.File_As_message
    }
    }
 console.log(x);
 let a=this.getFormData(x);
 this.service.SendResponseAdvRequest(a).subscribe((res:any)=>{
   console.log(res);
   this.ResetMessage();
   this.getUserConve();

 })
}
ResetMessage=()=>{
  this.MessageForm.reset();
  this.File_As_message=null;
  this.Validator=false;
}
getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

goToLink(data){
  console.log(data);
  window.open(this.Images_base_Url+data, "_blank");
}
}
