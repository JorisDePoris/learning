import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, map, mergeMap, takeUntil, tap } from 'rxjs';

import * as p5 from 'p5';

@Component({
  selector: 'panel-one',
  templateUrl: './panel-one.component.html',
  styleUrls: ['./panel-one.component.scss']
})
export class PanelOneComponent implements OnInit, AfterViewInit {

  @ViewChild('sketch')
    sketch!: ElementRef;
sw = 1;
strokeColor = 0;
canvas: any;
x: number[] = [];
y: number[] = [];
// delta: number[] = [];

ngOnInit() {

}

ngAfterViewInit(): void {
  const amt = 50;
  const sketch = (s: any) => {

    s.preload = () => {
      // preload code
    }

    s.setup = () => {
      s.createCanvas(s.windowWidth, s.windowHeight);

      for (let i = 0; i < amt; i++) {
        this.x.push(s.windowWidth/amt * i);
        this.y.push(s.height);
        // this.delta.push(s.random(1,100)/100);
      }
      s.frameRate(60);
    };

    s.draw = () => {
      // s.background(200);
      s.noStroke();
      s.fill(s.random(230,255));
      for (let i = 0; i < amt; i++) {
        s.ellipse(this.x[i], this.y[i], 24, 24);
        this.x[i] = this.x[i] + s.random(-10, 10);
        this.y[i] = this.y[i] - s.random(0,10)/5;
        if (this.y[i] < 0) {
          this.y[i] = s.height;
        }
      }

    };
  }

  this.canvas = new p5(sketch, this.sketch.nativeElement);
}



}
