import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select, Form, Button } from 'antd';

import { settingsSelectors, settingsOperations } from '../../state/settings';

const { Option } = Select;
const { Item } = Form;

class Settings extends Component {
  componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const {
      language,
      updateLanguage,
      updateDirty,
      isDirty,
      pushChanges
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 3 }
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
            onChange={lang => {
              updateLanguage(lang);
              updateDirty(true);
            }}
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
        {isDirty && (
          <Item {...formItemLayout} label="You have unsaved changes">
            <Button type="primary" onClick={pushChanges}>
              Save
            </Button>
          </Item>
        )}
      </Form>
    );
  }
}

Settings.propTypes = {
  language: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  verifyData: PropTypes.func.isRequired,
  updateDirty: PropTypes.func.isRequired,
  isDirty: PropTypes.bool.isRequired,
  pushChanges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  language: settingsSelectors.getLanguage(state),
  isDirty: settingsSelectors.isDirty(state)
});

const mapDispatchToProps = dispatch => ({
  updateLanguage: language =>
    dispatch(settingsOperations.updateLanguage(language)),
  verifyData: () => dispatch(settingsOperations.verifyData()),
  updateDirty: isDirty => dispatch(settingsOperations.updateDirty(isDirty)),
  pushChanges: () => dispatch(settingsOperations.pushChanges())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
