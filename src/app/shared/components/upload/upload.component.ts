import { SelectionModel } from '@angular/cdk/collections';
import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { SpinnerService } from 'src/app/login/service/spinner.service';
import { Notice } from 'src/app/models/notice.model';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges {

  @Input()
  type: string | undefined;

  @Input()
  subject: string | undefined;

  @Output()
  fireUpdate: EventEmitter<any> = new EventEmitter<any>();



  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Notice>([]);
  result: any;
  notices: Notice[] = [];
  userType = '';
  selection = new SelectionModel<Notice>(false, []);
  selectedFileName: any;



  constructor(private uploadService: UploadService, private loginService: LoginService, private route: Router,
              private spinnerService: SpinnerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.type?.currentValue) {
      this.spinnerService.showSpinner(true);
      this.uploadService.getNotice(changes.type.currentValue).subscribe(result => {
        this.notices = result.reverse();
        if (this.notices.length === 0) {
          this.selectedFileName = undefined;
        }
        this.dataSource = new MatTableDataSource(this.notices);
        this.spinnerService.showSpinner(false);
      });
    }
  }

  ngOnInit(): void {
    this.userType = this.loginService.getUser().userType;
    this.displayedColumns = this.getColumns(this.type, this.userType);
    this.selection.changed.subscribe(row => {
      const selectedRow = row.added[0];
      if (selectedRow) {
        this.selectedFileName = selectedRow.id;
        if (this.type === 'assignments') {
          const subject = this.selectedFileName.substr(0, this.selectedFileName.indexOf('-'));
          this.fireUpdate.emit(subject);
        }
      } else {
        this.selectedFileName = undefined;
        this.fireUpdate.emit(undefined);
      }
    });
  }
  getColumns(type: string | undefined, userType: string): string[] {
    let columns: string[] = ['select', 'date', 'name', 'delete'];
    if (type === 'assignments' && userType !== 'Student') {
     // this.displayedColumns = [...this.displayedColumns, 'delete', 'subTeacher'];
      columns = ['select', 'date', 'name', 'delete', 'subTeacher'];
    }
    if (this.type === 'assignments' && this.userType === 'Student') {
     // this.displayedColumns = [...this.displayedColumns, 'upload', 'subStudent'];
      columns = ['date', 'name', 'upload', 'subStudent'];
    }
    if (type !== 'assignments' && userType === 'Student') {
      // this.displayedColumns = [...this.displayedColumns, 'delete', 'subTeacher'];
      columns = ['date', 'name'];
    }
    return columns;
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    let name = `${this.type?.substr(0, this.type.length - 1)}-${this.getCounter()}`;
    if (this.selectedFileName) {
      name = this.selectedFileName;
    }
    let filePath = `/uploads/${this.type}/${name}`;
    if (this.subject && !this.selectedFileName) {
      filePath = `/uploads/${this.type}/${this.subject}-${name}`;
      name = `${this.subject}-${name}`;
    }
    const counter = this.notices.length + 1;
    this.uploadService.uploadFile(file, name, this.getFormattedDate(new Date()), filePath, this.type, counter);

  }

  getFormattedDate = (date: Date) => {
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [day, month, date.getFullYear()].join('-');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView = (url: string) => {
    if (url.length > 0) {
      window.open(url);
    }
  }


  onDelete = (element: Notice) => {
    const filePath = `/uploads/${this.type}`;
    console.log(element);
    this.uploadService.delete(this.type, element.name, filePath);
  }

  onSub = (id: string) => {
    this.route.navigateByUrl(`assignment/submission/${id}`);
  }

  getCounter() {
    const tempSubject = this.subject ? this.subject : '';
    console.log(tempSubject);

    const filteredNotices = this.notices.filter(notice => notice.name.startsWith(tempSubject));
    if (filteredNotices.length === 0) {
      return '1';
    }
    else {
      const name = filteredNotices[0]?.name;
      console.log(name);

      const count = name.substr(name.lastIndexOf('-') + 1, name.length);
      console.log(count);

      return Number(count) + 1;
    }
  }

  uploadSubmission(event: any, element: any) {
    const file = event.target.files[0];
    const stdId = this.loginService.getUser().userId;
    const name = `${stdId}-${element.name}`;
    const filePath = `/uploads/submissions/${name}`;
    this.uploadService.uploadSubmission(file, name, this.getFormattedDate(new Date()), filePath, element.name, stdId, element);
  }


}
