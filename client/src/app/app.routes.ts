import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentsFormComponent } from './students/students-form/students-form.component';

export const routes: Routes = [
    {
        path: 'students',
        component: StudentsComponent
    },
    {
        path: 'students/:id',
        component:StudentsFormComponent
    }
];
