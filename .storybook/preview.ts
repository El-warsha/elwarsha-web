import type { Preview } from "@storybook/react";

import "../src/core/theme/tokens.css";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
  },
};

export default preview;
