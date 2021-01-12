import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

interface Props {
  locale: string;
  children: object;
}

function getMessages(locale: string): Record<string, string> {
  let messages: Record<string, string>;
  try {
    messages = require(`../../i18n/lang/${locale}.json`)
  } catch (error) {
    messages = require(`../../i18n/lang/en.json`)
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
