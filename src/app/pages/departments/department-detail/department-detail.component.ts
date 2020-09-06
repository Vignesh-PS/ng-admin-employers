import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common.service';
import { WebService } from 'src/app/providers/web.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {

  pageAction:string;

  pageData:any = {};

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private common: CommonService, private web: WebService) {

    this.pageAction = activatedRoute.snapshot.params.action;
    if(this.pageAction!='add'){
      this.getPageData(this.activatedRoute.snapshot.params.department);
    }

  }

  ngOnInit(): void {

  }


  getPageData(id:number){
    this.web.getData('getDepartment/'+id).subscribe(res=>{
      if(res.status=='200'){
        this.pageData = res.data;
      }else{
        this.common.presentToast(res.error, 'Error');
      }
    },err=>{
      console.log(err);
      this.common.presentToast('Connection Errror', 'Error');
    })
  }


  submitPageData(){
    console.log(this.pageData);

    if(this.pageData.department_name ==null || this.pageData.department_name==''){
      this.common.presentToast('Enter department name', 'Error');
      return
    } else if(this.pageData.department_description ==null || this.pageData.department_description==''){
      this.common.presentToast('Enter description', 'Error');
      return
    }

    let action = this.pageAction;
    if(action=='edit'){
      this.web.postData('updateDepartment/'+this.pageData.id, this.pageData).subscribe(res=>{
        console.log(res);
        if(res.status=='200'){
          this.common.presentToast(res.error);
        }else{
          this.common.presentToast(res.error, 'Error');
        }
      },err=>{
        console.log(err);
        this.common.presentToast('Connection Error', 'Error')
      })
    }else if(action=='add'){
      this.web.postData('departmentAdd', this.pageData).subscribe(res=>{
        console.log(res);
        if(res.status=='200'){
          this.common.presentToast(res.error);
          this.router.navigate(['/departments']);
        }else{
          this.common.presentToast(res.error, 'Error');
        }
      },err=>{
        console.log(err);
        this.common.presentToast('Connection Error', 'Error')
      })
    }
  }
}
