import { moduleMetadata } from '@storybook/angular';
import { SidenavLayoutComponent } from './sidenav-layout.component';
import { LayoutModule } from '../layout.module';

export default {
  title: 'ui-bulma|layout/sidenave-layout',
  component: SidenavLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [LayoutModule]
    })
  ]
};

export const primary = () => ({
  component: SidenavLayoutComponent,
  props: {}
});

export const mobile = () => ({
  component: SidenavLayoutComponent,
  props: {}
});

mobile.story = {
  name: '手机布局',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
