import React from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';

import germanData from 'react-intl/locale-data/de';
import german from './de_de';

addLocaleData(germanData);

const LanguageProvider = ({ children }) => (
  <IntlProvider locale="de" messages={german}>
    {children}
  </IntlProvider>
);

LanguageProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default LanguageProvider;
