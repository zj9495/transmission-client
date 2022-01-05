import React, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { find } from "lodash";

import { getLocale } from "src/store/selector/app";

import { LANGUAGES, DEFAULT_LANGUAGE } from "src/constants";

const defaultMessages = DEFAULT_LANGUAGE.strings;

interface Props {
  children: JSX.Element;
}

async function getMessages(locale: string): Promise<Record<string, any>> {
  const messages = await find(LANGUAGES, { code: locale })?.strings();
  return {
    ...defaultMessages,
    ...messages?.default,
  };
}
const Intl = (props: Props) => {
  const locale = useSelector(getLocale);
  const [messages, setMessages] = useState<Record<string, string>>(
    defaultMessages
  );
  const { children } = props;
  useEffect(() => {
    getMessages(locale).then((res) => {
      setMessages(res);
    });
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default Intl;
