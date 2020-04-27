import { moduleMetadata } from '@storybook/angular';
import { AppHeaderComponent } from './app-header.component';
import { CommonModule } from '@angular/common';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'ui-bulma|layout/app-header',
  component: AppHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [AppHeaderComponent]
    })
  ]
};

export const primary = () => ({
  component: AppHeaderComponent,
  props: {}
});

export const desktop = () => ({
  component: AppHeaderComponent,
  props: {}
});

desktop.story = {
  name: '桌面布局'
};

export const mobile = () => ({
  component: AppHeaderComponent,
  props: {
    header: text('header', 'Elane'),
    onToggle: action('toggleSidenav')
  },
  styles: [`::ng-deep {body { overflow: hidden; }}`]
});

mobile.story = {
  name: '手机布局',
  parameters: { viewport: { defaultViewport: 'mobile1' } }
};
