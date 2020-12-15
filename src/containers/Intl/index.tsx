import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import en_US from '../../i18n/lang/en.json';
import zh_CN from '../../i18n/lang/zh_CN.json';

interface Props {
  locale: string;
  children: object;
}
function getMessages(locale: string): Record<string, string> {
  let messages = en_US;
  switch (locale) {
    case 'en':
      messages = en_US;
      break;
    case 'zh-CN':
      messages = zh_CN;
      break;
    default:
      messages = en_US;
      break;
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

const mapStateToProps = (state: { locale: string }) => ({
  locale: state.locale,
});

export default connect(mapStateToProps)(Intl);
