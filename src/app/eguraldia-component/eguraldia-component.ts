import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';
import { CardNagusiaComponent } from '../card-nagusia-component/card-nagusia-component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  imports: [FormsModule, CardNagusiaComponent],
  selector: 'app-eguraldia-component',
  styleUrl: './eguraldia-component.css',
  templateUrl: './eguraldia-component.html',
})
export class EguraldiaComponent {

  hiria: string = "";
  latitud: number | null = null;
  longitud: number | null = null;
  iragarpenaData = signal<any | null>(null);
  hiriAukeratua: string = "";
  cdr: any;
  private notify: CardNagusiaComponent;

  private apiService = inject(ApiService);
  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr;
    this.notify = new CardNagusiaComponent(this.cdr);

  }


  bilatu(): void {
    if (!this.hiria.trim()) return;

    this.apiService.getLatLong(this.hiria).subscribe({
      next: (res: any) => {
        if (res.results && res.results.length > 0) {
          this.latitud = res.results[0].latitude;
          this.longitud = res.results[0].longitude;
          this.hiriAukeratua = res.results[0].name;

          console.log("lat: " + this.latitud)
          console.log("long: " + this.longitud)
          this.lortuIragarpena();
        } else {
          console.warn('Ez da aurkitu.');
        }
      },
      error: (err) => {
        console.error('Errorea API deian:', err);
      }
    });
  }

  private lortuIragarpena(): void {
    if (this.latitud === null || this.longitud === null) return;

    this.apiService.getIragarpena(this.latitud, this.longitud).subscribe({
      next: (res: any) => {
        this.iragarpenaData.set(res);
        this.cdr.detectChanges();
        this.cdr.detectChanges();

        console.log('Iragarpenaren datuak:', this.iragarpenaData);
      },
      error: (err) => {
        console.error('Errorea iragarpena lortzean:', err);
      }
    });
  }
}