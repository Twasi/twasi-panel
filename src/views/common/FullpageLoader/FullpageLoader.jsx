import React from 'react';
import PropTypes from 'prop-types';

import './_style.css';
import twasiImage from '../resources/twasi_anim_loading.gif';

const FullpageLoader = ({ text }) => (
  <div className="FullpageLoaderWrapper">
    <div>
      <div className="FullpageLoader">
        <img
          src={twasiImage}
          className="FullpageLoaderImage"
          alt="Twasi Logo"
        />
      </div>
      <div className="FullpageLoaderText">{text}</div>
    </div>
  </div>
);

FullpageLoader.propTypes = {
  text: PropTypes.string
};

export default FullpageLoader;
