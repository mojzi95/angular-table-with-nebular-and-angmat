import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tickers } from "../models/ticker.interface";
import { HttpClient } from '@angular/common/http'


@Injectable()
export class TickersService {
  private baseUrl = 'https://api.coinlore.net/api/';
  constructor(private http: HttpClient) { }

  fetchTickers(): Observable<Tickers> {
    return this.http.get<Tickers>(this.baseUrl+'tickers/');
  }
}
