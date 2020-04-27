import { moduleMetadata } from '@storybook/angular';
import { AppHeaderComponent } from './app-header.component';
import { CommonModule } from '@angular/common';

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
