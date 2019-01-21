import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  @Output() updateLikes = new EventEmitter();
  initInputBar(v) {
    if (v === '') {
      this.results = [];
      this.emptyDisplay = 'Search for waste items!';
    }
  }

  search(keyword) {
    // From the instruction: - A search must be performed when hitting enter or clicking the search button.
    // Therefore even though the input is blank, the app should do search.
    let likeArr = JSON.parse(localStorage.getItem('favourites'));
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
      tempR.id = this.results.length;
      if (likeArr[tempR.title]) {
        tempR.isLiked = true;
      }
      this.results.push(tempR);
    }
    if (this.results.length === 0) {
      this.emptyDisplay = 'Sorry, there are no results with your search term.';
    }
  }
  clickLike(index) {
    let temp = JSON.parse(localStorage.getItem('favourites'));
    if (temp[this.results[index].title]) {
      delete temp[this.results[index].title];
      this.results[index].isLiked = false;
    } else {
      temp[this.results[index].title] = this.results[index];
      this.results[index].isLiked = true;
    }
    localStorage.setItem('favourites', JSON.stringify(temp));
    this.updateLikes.emit(null);
  }
  cancelLike(re) {
    for (let r of this.results) {
      if (r.title === re.title) {
        r.isLiked = false;
      }
    }
  }
  ngOnInit() {
    if (localStorage.getItem('favourites') === null) {
      localStorage.setItem('favourites', '{}');
    }
  }

}
