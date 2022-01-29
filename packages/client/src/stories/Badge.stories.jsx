// Avatar.stories.js|jsx
import React from 'react';

import Badge from '@/components/common/Badge';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Badge',
  component: Badge,
  argTypes: {
    max: {
        control: {type: 'number'}
    },
    appearance: {
        options: ["success", "danger", "primary", "default"],
        control: { type: 'select' },
    },
    children: {
        control: {type: 'text'}
    },
  },
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
    max:1000,
    children: 50
}