import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngIf, pipes o directivas en el HTML si aplica

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-card-nagusia-component',
  templateUrl: './card-nagusia-component.html',
  styleUrl: './card-nagusia-component.css'
})
export class CardNagusiaComponent implements OnInit {

  @Input() eguraldia: any = null;

  cdr: any;
  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr;
  }

  ngOnInit(): void {
    console.log(this.eguraldia)
  }

  getWeatherIcon(code: number | undefined): string {
  if (code === undefined) return '/img/nublado.png';
  
  if (code === 0) return '/img/nubesyclaros.png';
  if (code >= 1 && code <= 3) return '/img/nublado.png';
  if (code >= 45 && code <= 48) return '/img/niebla.png';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return '/img/lluvia.png';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return '/img/nieve.png';
  if (code >= 95) return '/img/tormenta.png';
  
  return '/img/nublado.png';
}
}