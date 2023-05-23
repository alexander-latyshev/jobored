import { createStyles } from "@mantine/core";

export const useFormStyles = createStyles((theme) => ({
  input: {
    height: 42,
    width: "100%",
    color: "#ACADB9",
    border: "1px solid #D5D6DC",
    borderRadius: 8,
    background: "white",
    padding: "8px 12px",
    "::placeholder": {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: 14,
    },
  },
  button: {
    backgroundColor: theme.colors.bluePrimary,
    transition: "0.2s ease-in-out",
    width: "100%",
  },
  label: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 0,
    marginBottom: 17,
    marginTop: 20,
  },
  labelIndustry: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 0,
    marginBottom: 19,
    marginTop: 32,
  },
}));
