// Avatar.stories.js|jsx
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Avatar from '@/components/avatar';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    type:{
      options: ["circle", "square"],
      control: { 
        type: 'inline-radio'
      },
    } ,
    size:{
      options: ["small", "medium", "large", "x-large", "xx-large"],
      control: { type: 'select' },
    } ,
    imageUrl: {
      control: {type: 'text'}
    },
    href: {
      control: {type: 'text'}
    },
    target: {
      control: {type: 'text'}
    },
    label: {
      control: {type: 'text'}
    },
  },
};

export const Default = Avatar.bind({});

Default.args= {
 
}
