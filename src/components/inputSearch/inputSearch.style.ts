import { createStyles } from "@mantine/core";

export const useSearchStyles = createStyles((theme) => ({
  root: {
    minWidth: 320,
    width: "100%",
    maxWidth: 773,
  },
  wrapper: {
    minWidth: 320,
    width: "100%",
    maxWidth: 773,
    borderRadius: 8,
  },
  input: {
    height: 48,
    border: `1px solid ${theme.colors.grey}`,
    borderRadius: "8px",
  },
  icon: {
    paddingLeft: "6px",
  },
  rightSection: {
    width: "auto",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 20px",
    gap: "10px",
    width: "83px",
    height: "32px",
    background: theme.colors.bluePrimary,
    borderRadius: "8px",
    transition: "0.2s ease-in-out",
    marginRight: 12,
  },
}));
