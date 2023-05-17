import { createStyles } from "@mantine/core";

export const usePaginationStyles = createStyles((theme) => ({
  dots: {
    "&[data-active]": {
      background: theme.colors.blue,
    },
  },
}));
