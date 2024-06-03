import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, combineLatest, interval } from "rxjs";
import { SvgCircleComponent } from './svg-circle.component';

/**
 * Name events correctly. Now that we are in shape. 
 * Configure shapes 
 * Print Letters inside the circles/shapes
 * Remove circle and refactor component arrangment 
 * Surprised that angular is not defaulting with a prettier config.
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SvgCircleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
private _isAnswered: any = null;

  title = 'setsq';
  colors = ["red", "green"]
  isClicked: boolean = false;
  score = 0;
  timeRemaining = 10;
  subscription: any;
  activeCircle = 1;
  gameId: number =0;
  @ViewChild('audioOption') audioPlayerRef!: ElementRef;

  createNewGame() {
    const _isAnsweredTemp = new BehaviorSubject<any>({});
    const isAnswered$ = _isAnsweredTemp.asObservable();
    this._isAnswered = _isAnsweredTemp;
    const gameLoop = combineLatest([interval(1000), isAnswered$]);
    this.timeRemaining = 10;
    this.activeCircle = Math.floor(Math.random() * 10) % 4;
    this.gameId = Math.random();
    console.log("activeCirlce", this.activeCircle);

    this.subscription = gameLoop.subscribe(([t, circle]) => {
      console.log(circle);


      if (circle.hasOwnProperty("isActiveCircle") || this.timeRemaining == 0) {
        this.score += circle.isActiveCircle ? 1 : -1;

        this.subscription.unsubscribe();

        this.createNewGame();
      } else {
        this.timeRemaining -= 1;
      }
    })
  }

  constructor() {
    this.createNewGame();
  }

  isUserClicked(isActiveCircle: boolean) {
    this._isAnswered.next({ isActiveCircle })
  }

  afterClick({ isActiveCircle}:any  ) {
    if(!isActiveCircle) {
      this.audioPlayerRef.nativeElement.play();
    }
  }
}
