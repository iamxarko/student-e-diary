import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from 'src/app/login/service/spinner.service';
import { Notice } from 'src/app/models/notice.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private store: AngularFireDatabase, private storage: AngularFireStorage, private snackBar: MatSnackBar,
              private spinnerService: SpinnerService) { }

  getNotice = (type: string | undefined) => {
    return this.store.list<Notice>(`/uploads/${type}`, ref => ref.orderByChild('counter')).valueChanges();
  }


  uploadFile = (file: File, name: string, date: string, filePath: string, type: string | undefined, counter: number) => {
    const notice: Notice = {
      name,
      id: name,
      date,
      url: '',
      progress: '0',
      counter
    };

    this.store.object<any>(`/uploads/${type}/${name}`).update(notice).then(() => {
      console.log('data saved!');
    });

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((url => {
          this.store.object<any>(`/uploads/${type}/${name}`).update({ ...notice, url, progress: '100' }).then(() => {
            this.snackBar.open('File uploaded!', 'Dismiss', {
              duration: 5000,
            });
          });
        }));
      })
    ).subscribe();
  }

  delete(type: string | undefined, name: string, filePath: string) {
    this.spinnerService.showSpinner(true);
    this.store.object<any>(`/uploads/${type}/${name}`).remove().then(() => {
      this.snackBar.open('Data Deleted!', 'Dismiss', {
        duration: 5000,
      });
      this.storage.ref(`${filePath}/${name}`).delete();
      this.spinnerService.showSpinner(false);
    }, () => {
      console.log('Error occurred!');
      this.spinnerService.showSpinner(false);
    }).catch(() => {
      console.log('Error occurred!');
      this.spinnerService.showSpinner(true);
    });
  }

  uploadSubmission(file: any, name: string, date: string, filePath: string, fileName: string, stdId: string, element: any) {

    const notice: Notice = {
      name,
      id: name,
      date,
      url: '',
      progress: '0'
    };

    this.store.object<any>(`/uploads/assignments/${fileName}`).update({...element, progress: '0'}).then(() => {
      console.log('data saved!');
    });

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((url => {
          this.store.object<any>(`/uploads/submissions/${fileName}/${stdId}`).update({ ...notice, url, progress: '100' }).then(() => {
            this.store.object<any>(`/uploads/assignments/${fileName}`).update({ ...element, progress: '100' }).then(() => {
              console.log('data saved!');
            });
            this.snackBar.open('File uploaded!', 'Dismiss', {
              duration: 5000,
            });
          });
        }));
      })
    ).subscribe();
  }

}
