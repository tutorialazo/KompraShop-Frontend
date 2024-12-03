import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './floating-menu.component.html',
  styleUrl: './floating-menu.component.css'
})
export class FloatingMenuComponent {

}
