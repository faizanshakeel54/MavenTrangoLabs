import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor(public http: HttpClient) { }
  public BaseUrl = environment.baseUrl;
  public login = (obj): Observable<any[]> => {
    return this.http.post<any[]>(this.BaseUrl + 'Admin/LoginUserAdmin', obj);
  }
  public add_commodity = (obj): Observable<any[]> => {
 return this.http.post<any[]>(this.BaseUrl + 'Admin/CreateNewCom', obj);
  }
  public get_all_Commodities = (obj): Observable<any[]> => {
    return this.http.post<any[]>(this.BaseUrl + '/Admin/GetAllCommodities', obj);
     }
     Add_Advoice = (obj): Observable<any[]> => {
       return this.http.post<any[]>(this.BaseUrl + 'Admin/CreateNewAdvice', obj);
     }
     public Commodity_status = (obj): Observable< any[]> => {
         return this.http.post<any[]>(this.BaseUrl + 'Admin/UpdateCommStatus', obj);
    }

    public CreateNewNotification = (obj): Observable<any[]> => {
      return this.http.post<any[]>(this.BaseUrl + 'Admin/CreateNewNotification', obj);
    }
  public GetAllNotification = (obj): Observable<any[]> => {
    return this.http.post<any[]>(this.BaseUrl + '/Admin/GetAllNotificationsWeb', obj);
  }

public getAllAppUser = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/GetAllAppUsers', obj);
}
// Admin/GetConversationByUser
public GetConversationByUser = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/GetConversationByUser', obj);
}
public GetAllPublicMessagesAdmin = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/GetAllPublicMessagesAdmin', obj);
}



// Admin/SendResponseAdvRequest
public SendResponseAdvRequest = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/SendResponseAdvRequest', obj);
}


public CreatePublicMessage = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/CreatePublicMessage', obj);
}



public UpdateAppUserStatus = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/UpdateAppUserStatus', obj);
}

public DeleteHistory = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/DelAdv' , obj);
}

public DeleteHistoryByID = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/GetCommAdvByCommID' , obj);
}

public DelNotification  = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/DelNotification' , obj);
}

public DelPublicMessage  = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/DelPublicMessage' , obj);
}

public DelUserPersonalAdv  = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/DelUserPersonalAdv' , obj);
}
public token_varifying() {
  return !!localStorage.getItem('auth_token');
}

public GetDisclaimer = (): Observable<any[]> => {
  return this.http.get<any[]>(this.BaseUrl + 'Admin/GetDisclaimer', {});
}

public AddUpdateDisclaimer  = (obj): Observable<any[]> => {
  return this.http.post<any[]>(this.BaseUrl + 'Admin/AddUpdateDisclaimer' , obj);
}





}
