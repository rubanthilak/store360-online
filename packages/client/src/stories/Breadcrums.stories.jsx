// Avatar.stories.js|jsx
import React from "react";

import Breadcrums, { BreadcrumsItem } from "@/components/breadcrums";
import { BrowserRouter } from "react-router-dom";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Breadcrums",
  component: Breadcrums,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {},
};

const Template = (args) => (
  <Breadcrums {...args}>
    <BreadcrumsItem href="/login" text="Helloworld" />
    <BreadcrumsItem href="/login" text="Helloworld" />
    <BreadcrumsItem href="/login" text="Helloworld" />
    <BreadcrumsItem href="/login" text="Helloworld" />
    <BreadcrumsItem href="/login" text="Helloworld" />
    <BreadcrumsItem href="/login" text="Helloworld" />
    <BreadcrumsItem href="/login" text="Helloworld" />
    <BreadcrumsItem href="/login" text="Helloworld" />
  </Breadcrums>
);

export const Default = Template.bind({});

Default.args = {};
