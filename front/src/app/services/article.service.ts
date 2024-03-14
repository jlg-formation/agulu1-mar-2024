import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of, switchMap } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined = undefined;

  constructor(private http: HttpClient) {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(url, newArticle))
    );
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.get<Article[]>(url)),
      map((articles) => {
        this.articles = articles;
        return undefined;
      })
    );
  }

  remove(selectedArticles: Set<string>): Observable<void> {
    return of(undefined).pipe(
      switchMap(() =>
        this.http.delete<void>(url, { body: [...selectedArticles] })
      )
    );
  }
}
