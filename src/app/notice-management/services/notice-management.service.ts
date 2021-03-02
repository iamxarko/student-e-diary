import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Notice } from 'src/app/models/notice.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticeManagementService {

  constructor(private store: AngularFireDatabase, private storage: AngularFireStorage ) { }

  getNotice = () => {
    return this.store.list<Notice>(`/uploads/notices`).valueChanges();
  }

  uploadFile = (file: File, name: string, date: string, filePath: string) => {
    const notice: Notice = {
      name,
      id: name,
      date,
      url: '',
      progress: '0'
    };

    this.store.object<any>(`/uploads/notices/${name}`).update(notice).then(() => {
      console.log('data saved!');
    });

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((url => {
          this.store.object<any>(`/uploads/notices/${name}`).update({ ...notice, url, progress: '100'}).then(() => {
            console.log('data saved!');
          });
        }));
      })
    ).subscribe();
  }
}
