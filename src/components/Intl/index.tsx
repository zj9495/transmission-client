import React from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { find } from "lodash";

import { getLocale } from "src/store/selector";

import { LANGUAGES, DEFAULT_LANGUAGE } from "src/constants";

interface Props {
  children: JSX.Element;
}

function getMessages(locale: string): Record<string, string> {
  const messages = find(LANGUAGES, { code: locale })?.strings || {};
  const defaultMessages = DEFAULT_LANGUAGE.strings;
  return {
    ...defaultMessages,
    ...messages,
  };
}
const Intl = (props: Props) => {
  const locale = useSelector(getLocale);
  const { children } = props;
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default Intl;
