import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../../../services/article.service';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;

  isRefreshing = false;

  constructor(public articleService: ArticleService) {}

  refresh() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isRefreshing = true;
        }),
        switchMap(() => this.articleService.refresh()),
        tap(() => {
          this.isRefreshing = false;
        })
      )
      .subscribe();
  }
}
