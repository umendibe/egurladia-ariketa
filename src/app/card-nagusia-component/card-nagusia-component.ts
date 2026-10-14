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
  if (code === undefined) return './img/nublado';
  
  // Mapeo básico de weather_code de Open-Meteo
  if (code === 0) return './img/despejado'; // Despejado
  if (code >= 1 && code <= 3) return './img/nublado'; // Nublado
  if (code >= 45 && code <= 48) return './img/niebla'; // Niebla
  if (code >= 51 && code <= 67) return './img/lluvia'; // Lluvia
  if (code >= 71 && code <= 77) return './img/nieve'; // Nieve
  if (code >= 95) return './img/tormenta'; // Tormenta
  
  return './img/nublado';
}
}