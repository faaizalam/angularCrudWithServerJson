import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private apiUrl="http://localhost:3000/user"
  http=inject(HttpClient)
  getUser():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
}
addUser(user:User):Observable<User[]>{
    return this.http.post<User[]>(this.apiUrl,user)
  }
  updateUser(user:User):Observable<User[]>{
    return this.http.put<User[]>(`${this.apiUrl}/${user.id}`,user)
  }
  deleteUser(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
 
}
