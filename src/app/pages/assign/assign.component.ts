import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/providers/common.service';
import { WebService } from 'src/app/providers/web.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assigns',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignsComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private common: CommonService, private web: WebService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { }

  pageData:any = []
  pageDataTemp:any = []

  ngOnInit(): void {
    this.getPageData();
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.dateFilterCalculation();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


  dateFilterCalculation(){
    let fromDate = null;
    let toDate = null;

    if(this.fromDate){
      fromDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
      //fromDate = fromDate.toISOString();
    }

    if(this.toDate){
      toDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day);
    }

    if(fromDate){
      this.pageData = this.pageDataTemp.filter(x => {
        console.log(x.assigned_start_date, fromDate, x.assigned_end_date);

        let d1 = new Date(x.assigned_start_date);

        let d2 = new Date(x.assigned_end_date)
      return  ((d1.getTime() <= fromDate.getTime()) && (fromDate.getTime() <= d2.getTime()))
      })
    }


    console.log(fromDate, toDate);
  }


  getPageData(){
    this.web.getData('getAssigneds').subscribe(res=>{
      if(res.status=='200'){
        this.pageData = res.data
        this.pageData = this.pageData.reverse();
        this.pageDataTemp = JSON.parse(JSON.stringify(res.data));
      }else{
        this.common.presentToast(res.error, 'Error');
      }
    },err=>{
      console.log(err);
      this.common.presentToast('Connection Error', 'Error')
    })
  }


  deleteUser(id:number){
   if( window.confirm('Are you sure to delete an assign..?')){
      this.web.postData('deleteAssign/'+id, {}).subscribe(res=>{
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
