import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { catchError, delay, finalize, of, switchMap, tap } from 'rxjs';
import { ArticleService } from '../../../services/article.service';
import { NewArticle } from '../../../interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  f = new FormGroup({
    name: new FormControl('xxx', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    qty: new FormControl(1, [Validators.required, Validators.min(0)]),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;
  errorMsg = '';

  constructor(private articleService: ArticleService, private router: Router) {}

  submit() {
    console.log('submit');
    const newArticle: NewArticle = this.f.value as NewArticle;
    of(undefined)
      .pipe(
        tap(() => {
          this.isAdding = true;
          this.errorMsg = '';
        }),
        delay(300),
        switchMap(() => this.articleService.add(newArticle)),
        switchMap(() => this.articleService.refresh()),
        switchMap(() => this.router.navigateByUrl('/stock')),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = 'oups! Erreur';
          return of(undefined);
        }),
        finalize(() => {
          this.isAdding = false;
        })
      )
      .subscribe();
  }
}
