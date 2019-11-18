import {Component} from '@angular/core';
import {MarketStatusService} from './market-status.service';
import {Observable, of} from 'rxjs';
import {MarketPrice} from './market-price';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  model: any;
  searching = false;
  searchFailed = false;
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];
  symbol = '';
  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private marketStatusSvc: MarketStatusService) {


    //this.getMarketStatus('MSFT');

    // this.marketStatusSvc.getInitialMarketStatus('MSFT')
    //   .subscribe(data => {
    //     console.log('data: ', data);

    //     const prices = [];
    //     for (const key in data['Monthly Time Series']) {
    //       if (data['Monthly Time Series'].hasOwnProperty(key)) {
    //         const rec = data['Monthly Time Series'][key];

    //         const price = new MarketPrice();
    //         price.open = parseFloat(rec['1. open']);
    //         price.close = parseFloat(rec['4. close']);
    //         price.date = new Date(Date.parse(key));

    //         prices.push(price);
    //       }
    //     }

    //     console.log('prices:', prices);
    //     this.MarketStatus = prices;
    //   });
  }

  searchSymbol = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.marketStatusSvc.getInitialMarketStatus(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  public search() {
    this.getMarketStatus(this.symbol);
  }

  getMarketStatus(symbol: string) {
    this.marketStatusSvc.getInitialMarketStatus(symbol)
      .subscribe(data => {

        const prices = [];
        for (const key in data['Monthly Time Series']) {
          if (data['Monthly Time Series'].hasOwnProperty(key)) {
            const rec = data['Monthly Time Series'][key];

            const price = new MarketPrice();
            price.open = parseFloat(rec['1. open']);
            price.close = parseFloat(rec['4. close']);
            price.date = new Date(Date.parse(key));

            prices.push(price);
          }
        }

        this.MarketStatus = prices;
      });
  }
}
