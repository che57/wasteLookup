import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private wData;
  constructor(
    private http: HttpClient
  ) {
    this.getData();
  }
  getData() {
    this.http.get('../../assets/data/swm_waste_wizard_APR.json').subscribe((data) => {
      this.wData = data;
      // this.searchData('takeout');
    });
  }
  searchData(keyword) {
    let results = [];
    for (let x of this.wData) {
      if (x.keywords.indexOf(keyword) !== -1) {
        results.push(x);
      }
    }
    return results;
  }
}
