import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-svg-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-circle.component.html',
  styleUrl: './svg-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SvgCircleComponent {

  @Input() colors: string[] = ["red", "green"];
  @Input() circlesCount: number = 1;
  @Input() activeCircle: number = 1;
  @Input() gameSequence: number = 1;
  @Output() circleChosen = new EventEmitter<boolean>(false);
  key: any;
  _cachedCircles: any;
  get cachedCircles() {
    if (this._cachedCircles) {
      return this._cachedCircles
    }
    return this.circles;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["gameSequence"]) {
      this._cachedCircles = null;
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;

    const index = this.key.charCodeAt() - 97;
    const chosenCircle = this.cachedCircles.find((c: any) => c.index === index);
    if (chosenCircle) {
      this.sendSolution(chosenCircle);
    } else {
      this.sendSolution({ isActiveCircle: false });
    }

  }

  sendSolution(circle: any) {
    const circleInstance = this.cachedCircles.find((c: any) => c.index == circle.index);
    if (circleInstance) {
      circleInstance.isClicked = true;
      circleInstance.stroke = circleInstance.isClicked ? (circleInstance.isActive ? "yellow" : "blue") : "transparent";
    }

    setTimeout(() => {
      this.circleChosen.emit(circle.isActive);
    }, 250);
  }

  get circles() {
    const circles = new Array(this.circlesCount).fill(0).map((i, index) => {
      const isActive = index == this.activeCircle
      return {
        color: isActive ? this.colors[1] : this.colors[0],
        isActive,
        index,
        cx: 50 * (index + 1) + 50 * 2 * (index + 1),
        isClicked: false,
        stroke: "transparent"
      }
    });
    this._cachedCircles = circles;
    return circles

  }

  stroke(circle: any) {
    const color = circle.isClicked ? (circle.isActive ? "yellow" : "blue") : "transparent";
    console.log({ color });
    return color
  }

}
