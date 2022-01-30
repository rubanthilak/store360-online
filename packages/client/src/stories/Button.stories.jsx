// Avatar.stories.js|jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Button from "@/components/button";
import SVGIcon from '@/components/common/svg-icon/SVGIcon';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    label: {
      control: { type: "string" },
    },
    size: {
      options: ["default", "small", "mini", "icon"],
      control: { type: "select" },
    },
    appearance: {
      options: ["primary", "secondary", "accent", "success", "danger", "warning", "link", "text"],
      control: { type: "select" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    isSpan: {
      control: { type: "boolean" },
    }
  },
};

const Template = (args) => <Button {...args}></Button>;

export const Default = Template.bind({});

Default.args = {
  label: "Confirm Payment",
  size: "small"
};

const Template1 = (args) => <Button {...args}></Button>;

export const Icon = Template1.bind({});

Icon.args = {
  children: <SVGIcon fill="var(--color-primary-100)" className="w-5 h-5 mt-0.5" icon="user" />,
  size: "icon",
};


const Template2 = (args) => <Button {...args}>
  <SVGIcon fill="var(--color-primary-100)" className="w-4 h-4 mt-0.5" icon="user" />
  Confirm Payment
</Button>;

export const IconButton = Template2.bind({});

IconButton.args = {
  size: "default",
};
