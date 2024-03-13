import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined = undefined;

  constructor(private http: HttpClient) {}

  refresh() {
    this.http.get(url);
  }
}
