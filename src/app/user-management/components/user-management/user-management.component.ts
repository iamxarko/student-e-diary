import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserManagementService } from '../../services/user-management.service';


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
  filteredOptions: Observable<string[]> | undefined;


  displayedColumns: string[] = ['userId', 'name', 'password'];
  dataSource: any;

  constructor(private umService: UserManagementService) {
    this.umService.getUsers().subscribe(userList => {
      console.log(userList);
      this.users = userList;
      this.dataSource = new MatTableDataSource(this.users);

    });
  }

  ngOnInit() {
    this.filteredOptions = this.userType.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    );
    this.userId.valueChanges.subscribe(value => {
      const user = this.users.find(u => u.userId === value);
      if (user) {
        this.name.setValue(user.name);
        this.password.setValue(user.password);
        this.userType.setValue(user.userType);
      } else{
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
}
