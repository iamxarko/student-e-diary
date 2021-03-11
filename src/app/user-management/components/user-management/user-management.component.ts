import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserManagementService } from '../../services/user-management.service';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  userId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  userType = new FormControl('Admin', [Validators.required]);
  options: string[] = ['Admin', 'Student', 'Teacher'];
  selection = new SelectionModel<User>(false, []);
  selectedFileName: any;
  isRowSelected;


  displayedColumns: string[] = ['select','userId', 'name', 'password'];
  dataSource: any;
  constructor(private umService: UserManagementService) {
    this.isRowSelected = true;
    this.umService.getUsers().subscribe(userList => {
      console.log(userList);
      this.users = userList;
      this.dataSource = new MatTableDataSource(this.users);

    });
  }

  ngOnInit() {
    this.selection.changed.subscribe(row => {
      this.isRowSelected = false;
      console.log(this.isRowSelected);
      const selectedRow = row.added[0];
      if (selectedRow){
        const user = this.users.find(u => u.userId === selectedRow.userId);
        if (user){
          this.userId.setValue(user.userId);
          this.name.setValue(user.name);
          this.password.setValue(user.password);
          this.userType.setValue(user.userType);
        }
      }
      else {
        this.isRowSelected = true;
        this.userId.setValue('');
        this.name.setValue('');
        this.password.setValue('');
        this.userType.setValue('');      
      }
    });
  }

  private filterOptions(value: string): string[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add = () => {
    const user: User = {
      userId: this.userId.value,
      name: this.name.value,
      password: this.password.value,
      userType: this.userType.value
    };
    this.umService.addOrUpdate(user);

  }

  delete = () => {
    this.umService.delete(this.userId.value);
  }
  getUserIdErrorMessage() {
    if (this.userId.hasError('required')) {
      return 'You must enter a user id';
    }
    return this.userId.hasError('userId') ? 'Not a valid id' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter password';
    }
    return this.password.hasError('userId') ? 'Not a valid password' : '';
  }

  getNameErrorMessage(){
    if (this.name.hasError('required')){
      return 'You must enter name';
    }
    return this.password.hasError('name') ? 'Not a valid name' : '';
  }

  isValid = () => {
    return this.userId.invalid || this.password.invalid || this.name.invalid;
  }

}
