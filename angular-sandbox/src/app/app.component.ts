import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, fromEvent, asyncScheduler } from 'rxjs';

import { Observable, from, interval } from 'rxjs';
import { mergeMap, switchMap, map,filter, reduce, take, takeWhile, scan, distinctUntilChanged, throttle, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  scroll$ = fromEvent(document, 'scroll');
  progress$ = this.scroll$.pipe(
    throttleTime(30, asyncScheduler, { leading: false, trailing: true }),
    map((e: any) => {
      return this.calculateScrollPercent(e.target.documentElement);
    })
  );
  sub = new Subscription();
  @ViewChild('progressBar') progressBar: any;
  progressBarElement: any;

  show = false;
  count: number = 10;
  counter$ = interval(100).pipe(
    map(() => -1),
    scan((acc, curr) => {
      return acc + curr;
    }, 10),
    takeWhile(value => value >= 0)
  ).subscribe((val) => {
    this.count = val;
    if (val === 0) {
      this.show = true;
    }
  });

  constructor() {
    this.sub = this.progress$.subscribe((e) => {
      this.progressBarElement.style.width = `${e}%`;
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.progressBarElement = this.progressBar.nativeElement;
  }


  calculateScrollPercent(e: Element) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = e;

    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
