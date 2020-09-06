import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private baseUrl:string = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }


  postData(controller:string, data: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl+controller}`, data);
  }


  getData(controller: string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl+controller}`);
  }

}
