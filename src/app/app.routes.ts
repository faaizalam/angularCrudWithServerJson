import { Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';


export const routes: Routes = [
  {path:"",
    redirectTo:"user",
    pathMatch:"full"
  },
  {path:"user",
    component:UsersComponent
  }
]
