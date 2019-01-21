import { Component, OnInit } from '@angular/core';
import {SearchService} from './search.service';
import {Resules} from '../resules';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public results: Resules[];
  constructor(
    private searchService: SearchService
  ) {
    this.results = [];
  }
  initInputBar(v) {
    if (v === '') {
      this.results = [];
    }
  }

  search(keyword) {
    this.results = [];
    let temp = this.searchService.searchData(keyword);
    for (let x of temp) {
      let tempR = new Resules();
      tempR.title = x.title;
      x.body = x.body.replace(new RegExp('&lt;', 'g'), '<');
      x.body = x.body.replace(new RegExp('&amp;nbsp;', 'g'), ' ');
      tempR.rBody = x.body.replace(new RegExp('&gt;', 'g'), '>');
      console.log(tempR);
      this.results.push(tempR);
    }
    console.log(this.results);
  }
  ngOnInit() {
  }

}
