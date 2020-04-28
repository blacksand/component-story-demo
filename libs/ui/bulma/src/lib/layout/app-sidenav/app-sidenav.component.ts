import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'elane-app-sidenav',
  templateUrl: './app-sidenav.component.html',
  styleUrls: ['./app-sidenav.component.scss']
})
export class AppSidenavComponent {
  @Input()
  @HostBinding('class.is-open')
  open = true;
}
