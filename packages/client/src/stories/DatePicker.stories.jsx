// Avatar.stories.js|jsx
import React from 'react';

import DatePicker from '@/components/date-picker';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Date Picker',
  component: DatePicker,
  argTypes: {
    
  },
};

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});

Default.args = {
  hintText: "Select Date",
  date: null
}