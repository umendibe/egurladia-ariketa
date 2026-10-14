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
}