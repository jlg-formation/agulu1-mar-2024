import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map, of, switchMap, tap } from 'rxjs';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined = undefined;

  constructor(private http: HttpClient) {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      switchMap(() => this.http.post<void>(url, newArticle))
    );
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      switchMap(() => this.http.get<Article[]>(url)),
      map((articles) => {
        this.articles = articles;
        return undefined;
      })
    );
  }
}
