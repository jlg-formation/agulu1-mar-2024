import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../../../services/article.service';
import { catchError, delay, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<string>();
  errorMsg = '';

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      of(undefined)
        .pipe(
          delay(300),
          switchMap(() => this.articleService.refresh()),
          catchError((err) => {
            console.log('err: ', err);
            this.errorMsg = 'oups... erreur.';
            return of(undefined);
          })
        )
        .subscribe();
    }
  }

  refresh() {
    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isRefreshing = true;
        }),
        delay(300),
        switchMap(() => this.articleService.refresh()),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = 'oups... erreur.';
          return of(undefined);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      )
      .subscribe();
  }

  remove() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isRemoving = true;
        }),
        delay(300),
        switchMap(() => this.articleService.remove(this.selectedArticles)),
        switchMap(() => this.articleService.refresh()),
        tap(() => {
          this.selectedArticles.clear();
          this.isRemoving = false;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = 'oups... erreur.';
          return of(undefined);
        }),
        finalize(() => {
          this.isRemoving = false;
        })
      )
      .subscribe();
  }

  select(id: string) {
    if (this.selectedArticles.has(id)) {
      this.selectedArticles.delete(id);
      return;
    }
    this.selectedArticles.add(id);
  }
}
