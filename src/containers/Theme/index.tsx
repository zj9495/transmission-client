import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { enUS, zhCN, Localization } from "@material-ui/core/locale";

import { Theme as ITheme } from "src/types";
import { getLocale, getTheme } from "src/store/selector";

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
  const theme = createMuiTheme(
    {
      typography: {
        fontSize: 12,
      },
      palette: {
        type: themeType,
      },
    },
    messages
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
