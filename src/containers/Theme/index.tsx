import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { enUS, zhCN, Localization } from "@material-ui/core/locale";

import { IState } from "src/types";

interface Props {
  locale: string;
  themeType: "light" | "dark" | "auto";
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

const Theme = (props: Props) => {
  const { locale, themeType, children } = props;
  const messages = getMessages(locale);
  const theme = createMuiTheme(
    {
      palette: {
        type: themeType === "auto" ? undefined : themeType,
      },
    },
    messages
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const mapStateToProps = (state: IState) => ({
  locale: state.rpc.locale,
  themeType: state.rpc.theme,
});

export default connect(mapStateToProps)(Theme);
