import { configure, addDecorator, addParameters } from '@storybook/angular';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { withKnobs } from '@storybook/addon-knobs';

addParameters({
  docs: {
    iframeHeight: '60px',
    page: DocsPage,
    container: DocsContainer
  },
  backgrounds: [
    { name: 'twitter', value: '#00aced', default: true },
    { name: 'facebook', value: '#3b5998' },
    { name: 'grey', value: '#c5c5c5' }
  ],
  options: {
    sortStoriesByKind: true,
    storySort: (a, b) => {
      console.log(a, b);
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    }
  }
});

addDecorator(withKnobs);

configure(
  require.context('../src/lib', true, /\.stories\.(ts|tsx|mdx)$/),
  module
);
