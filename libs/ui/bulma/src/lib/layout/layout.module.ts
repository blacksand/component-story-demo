import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavLayoutComponent } from './sidenav-layout/sidenav-layout.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppSidenavComponent } from './app-sidenav/app-sidenav.component';
import { PageContainerComponent } from './page-container/page-container.component';
import { AppFooterComponent } from './app-footer/app-footer.component';



@NgModule({
  declarations: [SidenavLayoutComponent, AppHeaderComponent, AppSidenavComponent, PageContainerComponent, AppFooterComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
