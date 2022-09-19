import { ComponentMeta, ComponentStory } from "@storybook/react";
import { bool } from "prop-types";
import React from "react";
import { Button } from "./Button";

export default {
  title: "ButtonSneakers",
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    widthFull: {
      type: bool,
      defaultValue: false,
      options: [true, false],
      control: {
        type: 'radio'
      }
    },
    children: {
      name: 'Label',
      defaultValue: 'Button'
    }
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({});
Default.args = {
  widthFull: true,
  children: 'Button'
}

export const Large = Template.bind({});
Large.args = {
  widthFull: false,
  size: 'large',
  children: 'Button',
};

export const Medium = Template.bind({});
Medium.args = {
  widthFull: false,
  size: 'medium',
  children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  widthFull: false,
  size: 'small',
  children: 'Button',
};

export const CreateOrder = Template.bind({});
CreateOrder.args = {
  widthFull: true,
  size: 'large',
  children: 'Create order',
  animDisabled: true
};

export const CancelOrder = Template.bind({});
CancelOrder.args = {
  cancelBtn: true,
  widthFull: false,
  size: 'micro',
  children: 'Cancel',
};








/* export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
 */