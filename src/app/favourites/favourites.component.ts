import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Resules} from '../resules';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['../search/search.component.css']
})
export class FavouritesComponent implements OnInit {
  private likeArr: Resules[];
  constructor() {
    this.likeArr = [];
    this.renderLikes();
  }
  @Output() updateResult = new EventEmitter();
  renderLikes() {
    this.likeArr = [];
    let temp = JSON.parse(localStorage.getItem('favourites'));
    for (let x in temp) {
      this.likeArr.push(temp[x]);
    }
  }
  cancelLike(title) {
    let temp = JSON.parse(localStorage.getItem('favourites'));
    this.updateResult.emit(temp[title]);
    delete temp[title];
    localStorage.setItem('favourites', JSON.stringify(temp));
    this.renderLikes();
  }

  ngOnInit() {
  }

}
