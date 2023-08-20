import { Component, OnInit } from '@angular/core';
import { faRotateRight, faTrashCan, faAdd } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from './users.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {

  user: UserModel = new UserModel();
  users: Array<any> = new Array();
  selectedUserIndex: number | null = null;

  filterText: string = '';
  filterGender: string = 'Todos';
  filteredUsers: Array<any> = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
      this.fetchUsers();
  }

  fetchUsers(){
    this.selectedUserIndex = null;
    this.usersService.fetchUsers().subscribe(
        users => {
            this.users = users;
            this.applyFilter();
        },
        error => {
            console.log("error fetching users", error);
        }
    );
}

applyFilter() {
    const filteredText = this.filterText.toLowerCase();
    this.filteredUsers = this.users.filter(user => {
        const nameMatches = user.name.toLowerCase().includes(filteredText);
        const emailMatches = user.email.toLowerCase().includes(filteredText);
        
        return (nameMatches || emailMatches);
    });
  }

  createUser(){
    this.usersService.createUser(this.user)
    .subscribe(user => { 
      this.user = new UserModel();
      this.fetchUsers();
    }, error => { 
      console.log('error creating user', error);
    });
  }

  updateUser(id: number){
    this.usersService.updateUser(id, this.user)
    .subscribe(user => { 
      this.user = new UserModel();
      this.selectedUserIndex = null;
      this.fetchUsers();
    }, error => { 
      console.log('error updating user', error);
    });
  }

  removeUser(id: number) {
    if (id === null || id === undefined) {
        console.log("No user ID provided.");
        return;
    }

    if (confirm("Are you sure you want to delete this user?")) {
      this.usersService.deleteUser(id)
        .subscribe(() => {
          this.selectedUserIndex = null;
          this.user = new UserModel();
          this.fetchUsers(); // Refresh the user list
        }, error => {
          console.log('error deleting user', error);
      });
    }
  }

  selectUser(index: number) {
    const user = this.users[index]; // Get the selected user object
  
    this.selectedUserIndex = index;
    this.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender === 'male' ? 'Masculino' : 'Feminino',
      status: user.status === 'active'
    };
  }

  cancelForm() {
    this.selectedUserIndex = null;
    this.user = new UserModel();
  }

  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  faAdd = faAdd;
}