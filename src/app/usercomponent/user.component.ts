import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

declare var M: any;

@Component({
  selector: 'app-usercomponent',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
})

export class UserComponent implements OnInit {

constructor(private userService: UserService) { }

ngOnInit() {
    this.resetForm();
    this.refreshUserList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.userService.selectedUser = {
      _id: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      age: null,
      gender: '',
      hobbie: '',
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  onEdit(emp: User) {
    this.userService.selectedUser = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}
