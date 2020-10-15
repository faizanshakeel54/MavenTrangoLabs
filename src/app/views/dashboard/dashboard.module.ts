import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommoditiesComponent } from './commodities/commodities.component';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngb-modal';
import { ChatComponent } from './chat/chat.component';
import { NotificationComponent } from './notification/notification.component';
import { UsersComponent } from './users/users.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			// tslint:disable-next-line: indent
			position: 'middle',
			distance: 12
		},
		vertical: {
		position: 'top',
		distance: 12,
		gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonalAdviceComponent } from './personal-advice/personal-advice.component';
import { PublishNotifactionComponent } from './publish-notifaction/publish-notifaction.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxSpinnerModule


  ],
  // tslint:disable-next-line: max-line-length
  declarations: [ DashboardComponent, CommoditiesComponent, ChatComponent, NotificationComponent, UsersComponent, PersonalAdviceComponent, PublishNotifactionComponent, DisclaimerComponent ]
})
export class DashboardModule { }
