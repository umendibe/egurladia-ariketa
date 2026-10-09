import { Component, OnInit } from '@angular/core';
import { CardNagusiaComponent } from '../card-nagusia-component/card-nagusia-component';
import { ApiService } from '../services/api';

@Component({
  imports: [CardNagusiaComponent],
  selector: 'app-eguraldia-component',
  styleUrl: './eguraldia-component.css',
  templateUrl: './eguraldia-component.html',
})
export class EguraldiaComponent implements OnInit {
  hiria: string = 'Madrid';
  location: [number, number] | null = null;

  private api: ApiService;
  constructor(api: ApiService) {
    this.api = api;
  }

  ngOnInit() {
    try {
      this.api.getLatLong(this.hiria).subscribe((data: any) => {
        console.log(data);

        this.api.getIragarpena(data.results[0].latitude, data.results[0].longitude).subscribe((data: any) => {
          console.log(data);

        });
      });

      //this.data = this.getIragarpena(this.latitude, this.longitude)

      console.log('Latitude:', this.getLatitude());
      console.log('Longitude:', this.getLongitude());
    } catch (error) {
      console.error('Errorea:', error);
    }
  }

  public getLatitude(): number | null {
    return this.location ? this.location[0] : null;
  }

  public getLongitude(): number | null {
    return this.location ? this.location[1] : null;
  }

  private async getEguraldia(hiria: string): Promise<[number, number]> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${hiria}&count=1&language=eu&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.results || data.results.length === 0) {
      throw new Error(data.reason || 'Ez da aurkitu kokapenik.');
    }

    return [data.results[0].latitude, data.results[0].longitude];
  }
}