import React from 'react';

import userInfo from '../services/userInfo';
import withService from './common/withService';

const Main = props => {
  props.service(result => console.log(result));
  return <div>Main</div>;
};

export default withService(Main, userInfo);
