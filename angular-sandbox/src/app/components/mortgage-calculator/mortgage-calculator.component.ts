import { Observable, combineLatest, fromEvent, map } from 'rxjs';

import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss']
})
export class MortgageCalculatorComponent implements AfterViewInit {
  monthlyPayment: string = "0.00";

  loanAmount: Element | undefined;
  interest: Element | undefined;
  loanLength: NodeListOf<Element> | undefined;
  expected: string | undefined;

  //helpers
  createInputValueStream(element: Element | NodeListOf<Element>) {
    return fromEvent(element, 'input')
      .pipe(
        map((event: any) => parseFloat(event.target.value))
      )
  }

  //streams
  interest$: Observable<any> | undefined;
  loanLength$: Observable<any> | undefined;
  loanAmount$: Observable<any> | undefined;

  constructor() {

  }

  ngAfterViewInit(): void {
    this.loanAmount = document.getElementById('loanAmount') as Element;
    this.interest = document.getElementById('interest') as Element;
    this.loanLength = document.querySelectorAll('.loanLength') as NodeListOf<Element>;
    this.interest$ = this.createInputValueStream(this.interest);
    this.loanLength$ = this.createInputValueStream(this.loanLength);
    this.loanAmount$ = this.createInputValueStream(this.loanAmount);

    combineLatest(

    )
  }


  calculateMortgate(interest: number, loanAmount: number, loanLength: number) {
    const calculatedInterest = interest / 1200;
    const total = loanAmount * calculatedInterest / (1 - (Math.pow(1/(1 + calculatedInterest), loanLength)));
    return total.toFixed(2);
  }
}
