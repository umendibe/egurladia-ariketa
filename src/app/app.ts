import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EguraldiaComponent } from './eguraldia-component/eguraldia-component';

@Component({
  imports: [RouterOutlet, EguraldiaComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('egurladia-ariketa');
}
