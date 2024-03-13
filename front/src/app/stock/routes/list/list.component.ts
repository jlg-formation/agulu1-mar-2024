import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  faRotateRight = faRotateRight;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  articles = [
    {
      id: 'a1',
      name: 'Tournevis',
      price: 2.99,
      qty: 234,
    },
    {
      id: 'a2',
      name: 'Marteau',
      price: 6.5,
      qty: 12,
    },
  ];
}
