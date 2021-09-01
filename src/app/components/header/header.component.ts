import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() public headerText: string;
  @Input() public headerBackButton: string;
  @Input() public rightButtonIcon: string;
  @Input() public leftButtonIcon: string;

  @Output() private leftButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() private rightButtonClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  clickOnLeftButton() {
    this.leftButtonClick.emit();
  }

  clickOnRightButton(): void {
    this.rightButtonClick.emit();
  }
}
