import { Component, ChangeDetectorRef } from '@angular/core';
import { CardNagusiaComponent } from '../card-nagusia-component/card-nagusia-component';

interface Toki {
  id: number;
  name: string;
  country: string;
  admin1?: string;
}

interface GeocodingResponse {
  results?: Toki[];
}

@Component({
  imports: [CardNagusiaComponent],
  selector: 'app-eguraldia-component',
  styleUrl: './eguraldia-component.css',
  templateUrl: './eguraldia-component.html',
})
export class EguraldiaComponent {
  tokiak: Toki[] = [];
  bilatzen = false;
  bilaketa = '';
  hautatutakoTokia: Toki | null = null;
  errorea = '';
  private searchTimer?: ReturnType<typeof setTimeout>;
  private searchId = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  bilatuTokiak(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim();
    this.bilaketa = query;
    this.hautatutakoTokia = null;
    const searchId = ++this.searchId;
    clearTimeout(this.searchTimer);
    this.tokiak = [];
    this.errorea = '';
    this.bilatzen = query.length >= 2;

    if (query.length < 2) {
      this.cdr.detectChanges();
      return;
    }

    this.searchTimer = setTimeout(() => {
      this.getTokiak(query, searchId);
    }, 300);
  }

  aukeratuTokia(tokia: Toki) {
    this.searchId++;
    clearTimeout(this.searchTimer);
    this.hautatutakoTokia = tokia;
    this.bilaketa = `${tokia.name}, ${tokia.country}`;
    this.tokiak = [];
    this.bilatzen = false;
    this.errorea = '';
  }

  private async getTokiak(query: string, searchId: number) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=100&language=eu&format=json`;
    this.bilatzen = true;
    this.cdr.detectChanges();
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('No se pudieron cargar los sitios.');
      }

      const data: GeocodingResponse = await response.json();
      if (searchId === this.searchId) {
        this.tokiak = data.results ?? [];
      }
    } catch (error) {
      if (searchId === this.searchId) {
        this.errorea =
          error instanceof Error ? error.message : 'Errore bat gertatu da.';
      }
    } finally {
      if (searchId === this.searchId) {
        this.bilatzen = false;
        this.cdr.detectChanges();
      }
    }
  }
}
