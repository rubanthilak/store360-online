// Avatar.stories.js|jsx
import React from 'react';

import Listbox from '@/components/listbox';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Listbox',
  component: Listbox,
  argTypes: {

  },
};

const Template = (args) => <Listbox {...args} />;

export const Default = Template.bind({});

Default.args = {
  hintText: "Select Option",
  options: ['Male','Female','Transgender'],
  selected: null,
  onSelect: (index) => {console.log(index);}
}