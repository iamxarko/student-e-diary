import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Notice } from 'src/app/models/notice.model';
import { NoticeManagementService } from '../../services/notice-management.service';


@Component({
  selector: 'app-notice-management',
  templateUrl: './notice-management.component.html',
  styleUrls: ['./notice-management.component.scss']
})
export class NoticeManagementComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'view', 'delete'];
  dataSource = new MatTableDataSource<Notice>([]);
  result: any;
  notices: Notice[] = [];

  constructor(private noticeManagementService: NoticeManagementService) {
    this.noticeManagementService.getNotice().subscribe(result => {
      this.notices = result;
      console.log(this.notices);
      this.dataSource = new MatTableDataSource(this.notices);
    });
  }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const name = `notice-${Date.now()}`;
    const filePath = `/uploads/notices/${name}`;
    this.noticeManagementService.uploadFile(file, name, this.getFormattedDate(new Date()),  filePath);

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

  onDelete = () => {

  }

}
