import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  getStudents=():Observable<Student[]>=> this.http.get<Student[]>("http://localhost:5092/api/StudentsControllers")
}
