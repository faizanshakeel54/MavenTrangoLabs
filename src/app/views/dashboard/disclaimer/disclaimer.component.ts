import { AppserviceService } from './../../../appservice.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  disclaimerForm : FormGroup;
  public disData : any
  public disId : any

  constructor(public  fb : FormBuilder, private apiServices:AppserviceService, public spinner : NgxSpinnerService) { }

  ngOnInit(): void {
      this.disclaimerForm = this.fb.group({
           disclaimerText : ['']
      });

      this.GetDisclaimer();
  }


  GetDisclaimer=()=>{
    this.spinner.show();
    this.apiServices.GetDisclaimer().subscribe( (res : any ) => {
      this.disData = res.data;
      this.disId = res.data[0].disc_id;
      this.disclaimerForm.patchValue({
        "disclaimerText": res.data[0].description
      })
      console.log(res.data)
      this.spinner.hide();
    })

  console.log("Disclaimer Data");


}

  updateDisclaimer=()=>{
    this.spinner.show();
    let x = {
      auth_token : localStorage.getItem('auth_token'),
      user_id : localStorage.getItem('user_id'),
      description : this.disclaimerForm.controls['disclaimerText'].value,
      disc_id : this.disId,
    }
    this.apiServices.AddUpdateDisclaimer(x).subscribe( (res : any ) => {
      this.GetDisclaimer();
      this.spinner.hide();
    })
  }


}
