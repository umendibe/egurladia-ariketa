import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private http = inject(HttpClient);

  getLatLong(hiria: string): Observable<any> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${hiria}&count=1&language=eu&format=json`;
    return this.http.get(url);
  }

  getIragarpena(lat: number, long: number): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
    return this.http.get(url);
  }
}