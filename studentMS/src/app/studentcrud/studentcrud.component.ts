import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrl: './studentcrud.component.css'
})
export class StudentcrudComponent {

    StudentArray: any[] = [];
    isResultLoaded = false;
    isUpdateFormActive = false;


    Stname: string = "";
    Course: string = "";
    Fee: string = "";
    currentStudentId = "";

    constructor(private http:HttpClient){
      this.getAllStudent();
    }

    ngOnInit():void{}

    getAllStudent(){
      this.http.get("http://localhost:5000/api/student").subscribe((resultData:any)=>{
        this.isResultLoaded = true;
        this.StudentArray = resultData.data;
      });
    }

    register(){
      let bodyData = {
        "Stname":this.Stname,
        "Course":this.Course,
        "Fee":this.Fee
      };

      this.http.post("http://localhost:5000/api/student/add", bodyData).subscribe((resultData:any)=>{
        alert("Student Registered Successfully");
        this.getAllStudent();
      })
    }

    setUpdate(data:any){
      this.Stname = data.Stname;
      this.Course = data.Course;
      this.Fee = data.Fee;

      this.currentStudentId = data.Id;
    }

    UpdateRecords(){
      let bodyData = {
        "Stname":this.Stname,
        "Course":this.Course,
        "Fee":this.Fee
      };

      this.http.put("http://localhost:5000/api/student/update"+"/" + this.currentStudentId,bodyData).subscribe((resultData)=>{
        alert("Student Details Updated Successfully");
        this.getAllStudent();
      })
    }

    save(){
      if(this.currentStudentId ==''){
        this.register();
      }
      else{
        this.UpdateRecords();
      }

    }

    setDelete(data:any){
      this.http.delete("http://localhost:5000/api/student/delete"+"/"+data.Id).subscribe((resultData:any)=>{
        alert("Student Details Deleted Successfully");
        this.getAllStudent();
      })
    }
}
