import { Component, OnInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from './users.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {

  user: UserModel = new UserModel();
  users: Array<any> = new Array();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
      this.fetchUsers();
  }

  fetchUsers(){
    this.usersService.fetchUsers().subscribe(
      users => {
        this.users = users
      }, error => {
        console.log("erro", error)
      }
    )
  }

  createUser(){
    this.usersService.createUser(this.user)
    .subscribe(user => { 
      this.user = new UserModel();
      this.fetchUsers();
    }, error => { 
      console.log('erro', error)
    })
  }

  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  faAdd = faAdd;
}