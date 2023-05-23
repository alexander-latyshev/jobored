import { createStyles } from "@mantine/core";

export const usePaginationStyles = createStyles((theme) => ({
  control: {
    "&[data-active]": {
      background: theme.colors.bluePrimary,
      transition: "0.2s ease-in-out",
    },
  },
  dots: { display: "none" },
}));
