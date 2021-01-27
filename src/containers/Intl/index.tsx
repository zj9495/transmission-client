/* eslint-disable import/no-dynamic-require */
import React from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";

import { IAppState } from "../../types";

interface Props {
  locale: string;
  children: JSX.Element;
}

function getMessages(locale: string): Record<string, string> {
  let messages: Record<string, string>;
  try {
    // eslint-disable-next-line global-require
    messages = require(`../../i18n/lang/${locale.replace("-", "_")}.json`);
  } catch {
    // eslint-disable-next-line global-require
    messages = require(`../../i18n/lang/en.json`);
  }
  return messages;
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

const mapStateToProps = (state: IAppState) => ({
  locale: state.rpc.locale,
});

export default connect(mapStateToProps)(Intl);
