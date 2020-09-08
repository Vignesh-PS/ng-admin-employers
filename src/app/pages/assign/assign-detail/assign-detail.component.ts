import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common.service';
import { WebService } from 'src/app/providers/web.service';

@Component({
  selector: 'app-assign-detail',
  templateUrl: './assign-detail.component.html',
  styleUrls: ['./assign-detail.component.scss']
})
export class AssignDetailComponent implements OnInit {

  pageAction:string;

  pageData:any = {};
  pageUserData:any = [];
  pageDepartmentData:any = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private common: CommonService, private web: WebService) {

    this.pageAction = activatedRoute.snapshot.params.action;
    if(this.pageAction!='add'){
      this.getPageData(this.activatedRoute.snapshot.params.assign);
    }

  }

  dateConverter(obj:any){
      return new Date(obj.year, obj.month-1, obj.day);
  }

  ngOnInit(): void {
    this.getPageDepartmentData();
    this.getPageUserData();
  }


  getPageData(id:number){
    this.web.getData('getAssigned/'+id).subscribe(res=>{
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

  getPageUserData(){
    this.web.getData('getEmployers').subscribe(res=>{
      if(res.status=='200'){
        this.pageUserData = res.data
        this.pageUserData = this.pageUserData.reverse();
      }else{
        this.common.presentToast(res.error, 'Error');
      }
    },err=>{
      console.log(err);
      this.common.presentToast('Connection Error', 'Error')
    })
  }


  getPageDepartmentData(){
    this.web.getData('getDepartments').subscribe(res=>{
      if(res.status=='200'){
        this.pageDepartmentData = res.data
        this.pageDepartmentData = this.pageDepartmentData.reverse();
      }else{
        this.common.presentToast(res.error, 'Error');
      }
    },err=>{
      console.log(err);
      this.common.presentToast('Connection Error', 'Error')
    })
  }



  submitPageData(){
    console.log(this.pageData);

    if(this.pageData.dept_id ==null || this.pageData.dept_id==''){
      this.common.presentToast('Choose any department', 'Error');
      return
    } else if(this.pageData.employer_id ==null || this.pageData.employer_id==''){
      this.common.presentToast('Please choose employer', 'Error');
      return
    }else if(this.pageData.assigned_start_date   ==null || this.pageData.assigned_start_date  ==''){
      this.common.presentToast('Choose start date', 'Error');
      return
    } else if(this.pageData.assigned_end_date ==null || this.pageData.assigned_end_date==''){
      this.common.presentToast('Enter end date', 'Error');
      return
    }

    let action = this.pageAction;
    this.pageData.assigned_start_date = this.dateConverter(this.pageData.assigned_start_date);
    this.pageData.assigned_end_date = this.dateConverter(this.pageData.assigned_end_date);
    if(action=='edit'){
      this.web.postData('updateAssign/'+this.pageData.id, this.pageData).subscribe(res=>{
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
      //return;
      this.web.postData('assignedAdd', this.pageData).subscribe(res=>{
        console.log(res);
        if(res.status=='200'){
          this.common.presentToast(res.error);
          this.router.navigate(['/assignment']);
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
