import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, fromEvent, map, merge, mergeMap, of, switchMap, takeUntil, tap, timer, pluck, exhaustMap, filter } from 'rxjs';

@Component({
  selector: 'panel-two',
  templateUrl: './panel-two.component.html',
  styleUrls: ['./panel-two.component.scss']
})
export class PanelTwoComponent implements OnInit, AfterViewInit {
  pollingStatus = [
    'Stopped',
    'Running'
  ];

  //streams
  status$: Observable<boolean>| undefined;

  constructor(
    public http : HttpClient
  ) {}

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const startButton = document.getElementById('start') as HTMLElement;
    const stopButton = document.getElementById('stop') as HTMLElement;
    const startClick$ = fromEvent(startButton, 'click');
    const stopClick$ = fromEvent(stopButton, 'click');
    const dogImage = document.getElementById('dog') as HTMLImageElement;
    startClick$.pipe(
      exhaustMap(() => timer(0, 4000).pipe(
        switchMap(() => this.http.get<any>('https://random.dog/woof.json')
        .pipe(
          filter(res => {return !res.url.endsWith('.mp4')}),
          map(res => {
            return res.url;
          })
          )
        ),
        takeUntil(stopClick$)
      ))
    ).subscribe(url => dogImage.src = url);



    this.status$ = merge(
      startClick$.pipe(
        map(() => true),
        ),
      stopClick$.pipe(
        map(() => false),
        ),
      of(false)
    );
  }


}
