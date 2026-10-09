import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Observable } from "rxjs";

@Service()
export class ApiService {
    private http = inject(HttpClient);

    private url = `https://geocoding-api.open-meteo.com/v1/search?name={hiria}&count=1&language=eu&format=json`;

    private url2 = `https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

    getLatLong(hiria: string): Observable<any> {
        this.url = this.url.replace('{hiria}', hiria);
        return this.http.get(this.url);
    }

    getIragarpena(lat: string, long: string) : Observable<any>  {
        this.url2 = this.url2.replace('{latitude}', lat);
        this.url2 = this.url2.replace('{longitude}', long);

        return this.http.get(this.url2);


    }
}