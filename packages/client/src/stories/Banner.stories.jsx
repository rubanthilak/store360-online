// Avatar.stories.js|jsx
import React from 'react';

import Banner from '@/components/banner';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Banner',
  component: Banner,
  argTypes: {

  },
};

const Template = (args) => <Banner {...args} />;

export const Default = Template.bind({});

Default.args = {
  icon: "user",
  truncate: true,
  link: "https://google.com",
  linkText: "Learn More",
  children: `The longest word in any of the major English language dictionaries, a word that refers to a lung disease contracted from the inhalation 
  of very fine silica particles, specifically from a volcano; medically specifically from a volcano; medically, it is the same as silicosis.`
}