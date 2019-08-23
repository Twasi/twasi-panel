import React from 'react';

import './_style.css';
import twasiImage from '../../common/resources/text_logo_twasi.svg';
//import twasiLoadingBar from '../resources/twasi_anim_loadingbar.gif';

const FullpageLoader = () => (
  <div className="FullpageLoaderWrapper">
      <div className="FullpageLoader">
        <img
          src={twasiImage}
          className="FullpageLoaderImage"
          alt="Twasi Logo"
        />
      </div>
  </div>
);

export default FullpageLoader;
