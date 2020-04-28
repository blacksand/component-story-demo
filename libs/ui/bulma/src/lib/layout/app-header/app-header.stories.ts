import { moduleMetadata } from '@storybook/angular';
import { AppHeaderComponent } from './app-header.component';
import { CommonModule } from '@angular/common';
import { text } from '@storybook/addon-knobs';
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

const makeProps = (title = 'Elane') => ({
  title: text('title', title),
  onToggle: action('toggleSidenav')
});

export const primary = () => ({
  component: AppHeaderComponent,
  props: makeProps()
});

export const desktop = () => ({
  component: AppHeaderComponent,
  props: makeProps()
});
desktop.story = {
  name: '桌面布局'
};

export const mobile = () => ({
  component: AppHeaderComponent,
  props: makeProps()
});
mobile.story = {
  name: '手机布局',
  parameters: { viewport: { defaultViewport: 'mobile1' } }
};

const longText = Array.from(new Array(10))
  .map(() => 'Elane')
  .join('');

export const longTitle = () => ({
  component: AppHeaderComponent,
  props: {
    title: text('title', longText),
    onToggle: action('toggleSidenav')
  }
});

longTitle.story = {
  name: '长标题能被截断',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
