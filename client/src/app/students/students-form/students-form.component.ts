import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.css'
})
export class StudentsFormComponent implements OnInit {
  /**
   *
   */
  form!:FormGroup;
  studentService = inject(StudentsService);

  constructor(private fb:FormBuilder) {
  }

  onSubmit(){
   this.studentService.addStudent(this.form.value).subscribe({
    next:(response)=>{
      console.log(response);
         
    },
    error: err=>{
      console.log(err);
      
    }
   })
  }

  ngOnInit(): void {
   this.form = this.fb.group({
    name:[],
    address:[],
    phoneNumber:[],
    email:[]
   });
  }
}
