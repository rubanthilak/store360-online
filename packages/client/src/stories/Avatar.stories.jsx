// Avatar.stories.js|jsx
import React from 'react';

import Avatar from '@/components/avatar';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Avatar',
  component: Avatar,
};

export const Default = () => <Avatar />;