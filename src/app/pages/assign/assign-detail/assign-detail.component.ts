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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private common: CommonService, private web: WebService) {

    this.pageAction = activatedRoute.snapshot.params.action;
    if(this.pageAction!='add'){
      this.getPageData(this.activatedRoute.snapshot.params.assign);
    }

  }

  ngOnInit(): void {

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


  submitPageData(){
    console.log(this.pageData);

    if(this.pageData.user_name ==null || this.pageData.user_name==''){
      this.common.presentToast('Enter assign name', 'Error');
      return
    } else if(this.pageData.user_age ==null || this.pageData.user_age==''){
      this.common.presentToast('Enter age', 'Error');
      return
    }
    if(this.pageData.user_age!='' && this.pageData.user_age!=null){
      if(typeof(this.pageData.user_age)!='number'){
        this.common.presentToast('Age should be number', 'Error');
        return;
      }
      if(this.pageData.user_age >65 || this.pageData.user_age <18){
        this.common.presentToast('Assign age should be 18 to 65', 'Error');
        return;
      }
    }
    if(this.pageData.user_city ==null || this.pageData.user_city==''){
      this.common.presentToast('Enter city name', 'Error');
      return
    } else if(this.pageData.user_state ==null || this.pageData.user_state==''){
      this.common.presentToast('Enter state name', 'Error');
      return
    } else if(this.pageData.user_country ==null || this.pageData.user_country==''){
      this.common.presentToast('Enter country name', 'Error');
      return
    }

    let action = this.pageAction;
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
      this.web.postData('assignAdd', this.pageData).subscribe(res=>{
        console.log(res);
        if(res.status=='200'){
          this.common.presentToast(res.error);
          this.router.navigate(['/assigns']);
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
