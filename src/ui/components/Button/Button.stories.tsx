import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button.js";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: "Apply for the next cohort",
  },
};

export const Ghost: StoryObj<typeof Button> = {
  args: {
    children: "See how the work happens",
    variant: "ghost",
  },
};
