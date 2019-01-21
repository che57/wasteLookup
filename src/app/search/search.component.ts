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
  public emptyDisplay = 'Search for waste items!';
  constructor(
    private searchService: SearchService
  ) {
    this.results = [];
  }
  initInputBar(v) {
    if (v === '') {
      this.results = [];
      this.emptyDisplay = 'Search for waste items!';
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
      x.body = x.body.replace(new RegExp('&gt;', 'g'), '>');
      if (x.body.indexOf('<li>') === -1) {
        x.body = '<ul><li>' + x.body + '</li></ul>';
      }
      tempR.rBody = x.body;
      this.results.push(tempR);
    }
    if (this.results.length === 0) {
      this.emptyDisplay = 'Sorry, there are no results with your search term.';
    }
  }
  clickLike() {

  }
  ngOnInit() {
  }

}
