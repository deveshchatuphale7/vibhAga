import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseURL = 'http://localhost:3000'
  httpPost(url:string,params?:any){
    return this.http.post(this.baseURL + url,params);
  }
  
  httpGet(url:string){
    return this.http.get(this.baseURL + url);
  }

  createBasicMessage(flag:string,msg:string): void {
    switch(flag){
case "info":{
  this.message.info(msg);
  break;
}case "error":{
  this.message.error(msg);
break;
}
case "success":{
  this.message.success(msg);
  break;
}

    }
    
  }

  constructor(private http : HttpClient,private message: NzMessageService) { }
}
