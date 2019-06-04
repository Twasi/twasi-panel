import React from 'react';

import './_style.css';
import twasiImage from '../resources/twasi_flat_white.svg';
// import twasiLoadingBar from '../resources/twasi_anim_loadingbar.gif';

const FullpageLoader = () => (
  <div className="FullpageLoaderWrapper">
    <div>
      <div className="FullpageLoader">
        <img
          src={twasiImage}
          className="FullpageLoaderImage"
          alt="Twasi Logo"
        />
      </div>
      {/*
      <img
        src={twasiLoadingBar}
        className="FullpageLoaderBar"
        alt="Twasi Loading Bar"
      />
      */}
    </div>
  </div>
);

export default FullpageLoader;
