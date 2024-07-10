import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../Model/user';
import { UserService } from '../../Service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  EditButton = faEdit;
  DeleteButton = faDeleteLeft;
  editMode: Boolean = false;
  usersList: User[] = [];
  user: User = {
    Department: "",
    Name: "",
    Gender: "",
    Mobile: "",
    Email: "",
    Doj: "",
    City: "",
    Salary: 0,
    Address: "",
    Status: false,
  };
  cityList: String[] = ["karachi", "multan", "lahore", "islamabad"];
  departmentList: String[] = ["Software", "Graphic", "IT", "Tester"];

  constructor(private _userService: UserService, private _toaster: ToastrService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  onResetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
  }

  onDelete(id:any) {
    this._userService.deleteUser(id).subscribe((res)=>{

      this.getUserList() 

    })
    // Implement delete logic here
  }

  onEdit(item: User) {
    this.user = { ...item };
    this.editMode = true;
  }

  getUserList() {
    this._userService.getUser().subscribe((res) => {
      this.usersList = res;
    });
  }

  onSubmit(form: NgForm): void {
    if (this.editMode) {
      this._userService.updateUser(this.user).subscribe(() => {
        this.getUserList();
        form.reset();
        this._toaster.success("User Edited Successfully", "Success");
      });
    } else {
      this._userService.addUser(this.user).subscribe(() => {
        this.getUserList();
        form.reset();
        this._toaster.success("User Added Successfully", "Success");
      });
    }
    this.editMode = false;
  }
}
