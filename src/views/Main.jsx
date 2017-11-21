import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import withService from './common/withService';

const Main = props => {
  const { services } = props;

  const getInfo = () => {
    services()
      .bot.info()
      .then(data => console.log(data))
      .catch(data => console.log(data));
  };

  return (
    <div className="Main__Content">
      <Button type="primary" onClick={getInfo}>
        Load info
      </Button>
    </div>
  );
};

Main.propTypes = {
  services: PropTypes.func.isRequired
};

export default withService(Main);
