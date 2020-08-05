import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RawData } from '../models/data.module';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  ROOT_URL = 'http://isol-grillassessment.azurewebsites.net';

  constructor(private http: HttpClient) {}
  fetchData() {
    return this.http.get(`${this.ROOT_URL}/api/GrillMenu`).pipe(
      map((data: RawData) => {
        return _.orderBy(data, ['menu'], ['asc']);
      })
    );
  }
}
