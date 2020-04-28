import { Component } from '@angular/core';

@Component({
  selector: 'elane-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.scss']
})
export class SidenavLayoutComponent {
  isSidenavOpen = true;
  readonly title = '易联软件';

  onToggleSidenav(_event: Event) {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
