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

  displayedColumns: string[] = ['date', 'name', 'view'];
  dataSource = new MatTableDataSource<Notice>([]);
  result: any;
  notices: Notice[] = [];
  userType = '';


  constructor(private uploadService: UploadService, private loginService: LoginService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type.currentValue) {
      this.uploadService.getNotice(changes.type.currentValue).subscribe(result => {
        this.notices = result;
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
    const name = `${this.type?.substr(0, this.type.length - 1)}-${Date.now()}`;
    const filePath = `/uploads/${this.type}/${name}`;
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
}
