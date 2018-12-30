import React from 'react';
import { IntlProvider } from 'react-intl';

const withLocale = Component => <IntlProvider locale="en">{Component}</IntlProvider>;

export default withLocale;
