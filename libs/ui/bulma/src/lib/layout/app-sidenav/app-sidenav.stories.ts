import { AppSidenavComponent } from './app-sidenav.component';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'ui-bulma|layout/app-sidenav',
  component: AppSidenavComponent,
  decorators: [
    moduleMetadata({
      declarations: [AppSidenavComponent]
    })
  ]
};

export const primary = () => ({
  component: AppSidenavComponent,
  props: {
    isOpen: boolean('open', true),
    openChange: action('openChange')
  },
  template: `
  <div style="width: 100vw; height: 100vh">
    <elane-app-sidenav [open]="isOpen" (openChange)="openChange($event)">
    </elane-app-sidenav>
  </div>
  `
});

export const mobile = () => ({
  component: AppSidenavComponent,
  props: {
    isOpen: boolean('open', true),
    openChange: action('openChange')
  }
});

mobile.story = {
  name: '手机布局',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
