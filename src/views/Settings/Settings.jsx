import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select, Form } from 'antd';

import { settingsSelectors, settingsOperations } from '../../state/settings';

const { Option } = Select;
const { Item } = Form;

class Settings extends Component {
  componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { language, updateLanguage } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Item {...formItemLayout} label="Select a Language">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a language"
            optionFilterProp="children"
            onChange={updateLanguage}
            value={language}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="EN_GB">English (GB)</Option>
            <Option value="DE_DE">German</Option>
          </Select>
        </Item>
      </Form>
    );
  }
}

Settings.propTypes = {
  language: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  verifyData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  language: settingsSelectors.getLanguage(state),
  isDirty: settingsSelectors.isDirty(state)
});

const mapDispatchToProps = dispatch => ({
  updateLanguage: language =>
    dispatch(settingsOperations.updateLanguage(language)),
  verifyData: () => dispatch(settingsOperations.verifyData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
