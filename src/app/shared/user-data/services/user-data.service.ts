import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private _HttpClient:HttpClient) { }

  getCurrentUser():Observable<any>{
    return this._HttpClient.get(`Users/currentUser`);
  }

  updateCurrentUser(data:FormData):Observable<any>{
    return this._HttpClient.put(`Users`,data);
  }


}
