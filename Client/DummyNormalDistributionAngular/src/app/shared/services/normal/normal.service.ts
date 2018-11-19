import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INormal } from '../../../models/INormal.model';

const ROOT_HOST = 'http://127.0.0.1:5000';

@Injectable()
export class NormalService {

  constructor(private http: HttpClient) { }

  start(normals: INormal[]) {
    const url = `${ROOT_HOST}/start`;
    return this.http.post<INormal[]>(url, normals, { observe: 'response' });
  }

  restart(normals: INormal[]) {
    const url = `${ROOT_HOST}/restart`;
    return this.http.post<INormal[]>(url, normals, { observe: 'response' });
  }

  stop() {
    const url = `${ROOT_HOST}/stop`;
    return this.http.delete<string>(url);
  }

  getNormals() {
    const url = `${ROOT_HOST}/get_normals`;
    return this.http.get<number[]>(url);
  }
}
