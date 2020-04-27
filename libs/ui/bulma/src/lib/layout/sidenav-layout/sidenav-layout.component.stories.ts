import { moduleMetadata } from '@storybook/angular';
import { SidenavLayoutComponent } from './sidenav-layout.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'ui-bulma|layout/sidenave-layout',
  component: SidenavLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [SidenavLayoutComponent]
    })
  ]
};

export const primary = () => ({
  component: SidenavLayoutComponent,
  props: {}
});

export const desktop = () => ({
  component: SidenavLayoutComponent,
  props: {}
});

desktop.story = {
  name: '桌面布局'
};
