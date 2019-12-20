import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private filesUrl = '/api/files';

  constructor(private http: HttpClient) {}

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  pushFileToStorage(file: File, id): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', `${this.filesUrl}/${id}` , formdata, { reportProgress: true, responseType: 'text'});

    return this.http.request(req);
  }


  getFiles(id): Observable<any> {
    return this.http.get(`${this.filesUrl + '/getallfiles'}/${id}` );
  }
}
