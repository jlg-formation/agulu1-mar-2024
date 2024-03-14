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
import { of, switchMap, tap } from 'rxjs';

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

  selectedArticles = new Set<string>();

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      this.articleService.refresh().subscribe();
    }
  }

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

  select(id: string) {
    if (this.selectedArticles.has(id)) {
      this.selectedArticles.delete(id);
      return;
    }
    this.selectedArticles.add(id);
  }
}
