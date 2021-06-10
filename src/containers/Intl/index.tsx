import React from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { find } from "lodash";

import { IState } from "src/types";
import { LANGUAGES, DEFAULT_LANGUAGE } from "src/constants";

interface Props {
  locale: string;
  children: JSX.Element;
}

function getMessages(locale: string): Record<string, string> {
  const messages = find(LANGUAGES, { code: locale })?.langFile || {};
  const defaultMessages = DEFAULT_LANGUAGE.langFile;
  return {
    ...defaultMessages,
    ...messages,
  };
}
const Intl = (props: Props) => {
  const { locale, children } = props;
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

const mapStateToProps = (state: IState) => ({
  locale: state.rpc.locale,
});

export default connect(mapStateToProps)(Intl);
