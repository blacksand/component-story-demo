import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'elane-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  @Input()
  header = 'ELANE';

  @Input()
  color?: 'info' | 'success' | 'primary' | 'warning' | 'danger';

  @Output()
  readonly toggle = new EventEmitter<Event>();

  get className() {
    const color = this.color || 'info';
    return `is-${color}`;
  }

  onToggle(event: Event) {
    this.toggle.emit(event);
  }
}
