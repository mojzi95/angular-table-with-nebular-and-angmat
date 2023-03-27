import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { TickerInterface } from 'src/app/models/ticker.interface';
import { TickersService } from 'src/app/services/tickers.service';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tickers',
  templateUrl: './tickers.component.html',
  styleUrls: ['./tickers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class TickersComponent {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  public displayedColumns: string[] = ['id', 'symbol', 'name', 'nameid', 'rank', 'price_usd', 'percent_change_24h', 'percent_change_1h', 'percent_change_7d', 'price_btc', 'market_cap_usd', 'volume24', 'volume24a', 'csupply', 'tsupply', 'msupply'];

  dataSource = new MatTableDataSource<TickerInterface>([]);

  constructor(private tickersService: TickersService, private _liveAnnouncer: LiveAnnouncer, private readonly cdr: ChangeDetectorRef) { }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterContentInit(): void {
    this.isLoading$.next(true);
    this.tickersService.fetchTickers().subscribe(tickers => {
      this.isLoading$.next(false);

      this.dataSource = new MatTableDataSource<TickerInterface>(tickers.data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);

      this.cdr.markForCheck()

    });



  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}


