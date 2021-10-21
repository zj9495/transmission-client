import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { enUS, zhCN, Localization } from "@mui/material/locale";
import { blue } from "@mui/material/colors";

import { Theme as ITheme } from "src/types";
import { getLocale, getTheme } from "src/store/selector/app";

interface Props {
  children?: JSX.Element;
}

function getMessages(locale: string): Localization {
  let muiLocale = enUS;
  switch (locale) {
    case "en":
      muiLocale = enUS;
      break;
    case "zh-CN":
      muiLocale = zhCN;
      break;
    default:
      break;
  }
  return muiLocale;
}

const getThemeType = (theme: ITheme) => {
  if (theme === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
};

const Theme = (props: Props) => {
  const locale = useSelector(getLocale);
  const themeFromStore = useSelector(getTheme);
  const [themeType, setThemeType] = useState(getThemeType(themeFromStore));
  useEffect(() => {
    setThemeType(getThemeType(themeFromStore));
  }, [themeFromStore]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const callback = () => {
      setThemeType(getThemeType(themeFromStore));
    };
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  }, []);
  const { children } = props;
  const messages = getMessages(locale);
  const theme = createTheme(
    {
      typography: {
        fontSize: 12,
      },
      palette: {
        mode: themeType,
        primary: {
          main: themeType === "light" ? blue[700] : blue[200],
          contrastText: "#fff",
        },
      },
    },
    messages
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
