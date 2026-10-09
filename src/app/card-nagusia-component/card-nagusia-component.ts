import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card-nagusia-component',
  styleUrl: './card-nagusia-component.css',
  templateUrl: './card-nagusia-component.html',
})
export class CardNagusiaComponent {
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() hiria: string | null = null;

  data: any = null;

  async ngOnInit() {
    try {
      this.data = this.getIragarpena(this.latitude, this.longitude)
      console.log('Iragarpena data:', this.data);
    } catch (error) {
      console.log(error)
    }
  }

  private async getIragarpena(latitude: number |null, longitude: number |null) {
    try {
      const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

      const res = await fetch(url2);
      this.data = await res.json();
      if (!res.ok) {
        throw new Error(this.data.reason || 'Errorea API-an');
      }

    } catch (error) {
      console.error('Errorea iragarpena lortzean:', error);
    }
  }

  getTenperatura(): number | string {
    return this.data?.current?.temperature_2m ?? '--';
  }
}