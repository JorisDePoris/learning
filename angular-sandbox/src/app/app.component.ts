import { Component } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sandbox';

  observable = new Observable(subscriber => {
    let count = 0;
    let id  = setInterval(() => {
      subscriber.next(count++);
    }, 1000);

    return () => {
      clearInterval(id)
    }
  });

  subscription = this.observable.subscribe((value: any) => {
    console.log('next', value);

    setTimeout(() => {
      this.subscription.unsubscribe();
    }, 3500);
  });

}
