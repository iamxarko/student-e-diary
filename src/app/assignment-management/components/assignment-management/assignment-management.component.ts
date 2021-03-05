import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-assignment-management',
  templateUrl: './assignment-management.component.html',
  styleUrls: ['./assignment-management.component.scss']
})
export class AssignmentManagementComponent implements OnInit {

  subject = new FormControl('HMI', [Validators.required]);
  options: string[] = ['HMI', 'CCL', 'DC', 'EM', 'NLP'];
  filteredOptions: Observable<string[]> | undefined;
  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.subject.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    );
  }

  private filterOptions(value: string): string[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
