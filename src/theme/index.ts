import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    brand: {
      600: "#647AC7",
    },
    blue: {
      700: "#364D9D",
      500: "#647AC7",
    },
    gray: {
      700: "#1A181B",
      600: "#3E3A40",
      500: "#5F5B62",
      400: "#9F9BA1",
      300: "#D9D8DA",
      200: "#EDECEE",
      100: "#F7F7F8",
    },
    white: "#FFFFFF",
  },
  fonts: {
    light: "Karla_300Light",
    body: "Karla_400Regular",
    heading: "Karla_700Bold",
  },
  /* fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148
  }, */
});
