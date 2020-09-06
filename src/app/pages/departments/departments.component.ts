import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/providers/common.service';
import { WebService } from 'src/app/providers/web.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  constructor(private common: CommonService, private web: WebService) { }

  pageData:any = []

  ngOnInit(): void {
    this.getPageData();
  }

  showToast(){

    this.common.presentToast('Initial message')
  }


  getPageData(){
    this.web.getData('getDepartments').subscribe(res=>{
      if(res.status=='200'){
        this.pageData = res.data
        this.pageData = this.pageData.reverse();
      }else{
        this.common.presentToast(res.error, 'Error');
      }
    },err=>{
      console.log(err);
      this.common.presentToast('Connection Error', 'Error')
    })
  }


  deleteDepartment(id:number){
   if( window.confirm('Are you sure to delete an department..?')){
      this.web.postData('deleteDepartment/'+id, {}).subscribe(res=>{
        if(res.status=='200'){
          this.common.presentToast(res.error, 'Success');
          this.getPageData();
        }else{
          this.common.presentToast(res.error, 'Error');
        }
      },err=>{
        console.log(err);
        this.common.presentToast('Connection Error', 'Error');
      })
    }
  }
}
