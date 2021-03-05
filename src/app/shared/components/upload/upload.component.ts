import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/service/login.service';
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

  displayedColumns: string[] = ['date', 'name', 'view', 'sub'];
  dataSource = new MatTableDataSource<Notice>([]);
  result: any;
  notices: Notice[] = [];
  userType = '';



  constructor(private uploadService: UploadService, private loginService: LoginService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.type?.currentValue) {
      this.uploadService.getNotice(changes.type.currentValue).subscribe(result => {
        this.notices = result.reverse();
        console.log(this.notices);
        this.dataSource = new MatTableDataSource(this.notices);
      });
    }
  }

  ngOnInit(): void {
    this.userType = this.loginService.getUser().userType;
    if (this.userType !== 'Student'){
      this.displayedColumns = [...this.displayedColumns, 'delete'];
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    let name = `${this.type?.substr(0, this.type.length - 1)}-${this.getCounter()}`;
   // const name = `${this.type?.substr(0, this.type.length - 1)}-${Date.now()}`;
    let filePath = `/uploads/${this.type}/${name}`;
    console.log(this.subject);
    if (this.subject){
      filePath = `/uploads/${this.type}/${this.subject}-${name}`;
      name = `${this.subject}-${name}`;
    }
    this.uploadService.uploadFile(file, name, this.getFormattedDate(new Date()), filePath, this.type);

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

  onSub = (url: string) => {
    if (url.length > 0) {
      window.open(url);
    }
  }

  getCounter(){
    const tempSubject = this.subject ? this.subject : '';
    const filteredNotices = this.notices.filter(notice => notice.name.startsWith(tempSubject));
    if (filteredNotices.length === 0)
    {
      return '1';
    }
    else{
      const name = filteredNotices[0]?.name;
      console.log(name);

      const count = name.substr(name.lastIndexOf('-') + 1, name.length);
      console.log(count);

      return Number(count) + 1;
    }
  }


}
