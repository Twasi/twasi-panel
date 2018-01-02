import React from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';

import germanData from 'react-intl/locale-data/de';
import germanAnt from 'antd/lib/locale-provider/de_DE';
import german from './de_de';

addLocaleData(germanData);

const LanguageProvider = ({ children }) => (
  <IntlProvider locale="de" messages={german}>
    <LocaleProvider locale={germanAnt}>{children}</LocaleProvider>
  </IntlProvider>
);

LanguageProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default LanguageProvider;
