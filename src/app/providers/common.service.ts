import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }

  presentToast(msg:string, title:string='Success'){
   if(title=='Success'){
          this.toastr.success(msg, title)
        }else{
          this.toastr.error(msg, title);
      }
  }
}
