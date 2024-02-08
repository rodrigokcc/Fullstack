import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Student } from '../types/student';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe,CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
    students$!:Observable<Student[]>   
     studentService = inject(StudentsService);

     ngOnInit(): void {
        this.students$=this.studentService.getStudents()
    }
}
