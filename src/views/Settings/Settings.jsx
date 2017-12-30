import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';

const { Option } = Select;
const { Item } = Form;

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
        language: 'EN_GB',
        isLoaded: false
      }
    };

    // this.loadData = this.loadData.bind(this);
  }

  /* componentDidMount() {
    this.loadData();
  } */

  /* loadData() {
    const { services } = this.props;
    /* services()
      .plugins.get()
      .then(data =>
        this.setState({ plugins: { plugins: data.plugins, isLoaded: true } })
      );
  } */

  render() {
    const { language } = this.state.settings;

    const handleLanguageChange = value =>
      this.setState({ settings: { language: value } });

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
            onChange={handleLanguageChange}
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
  services: PropTypes.func.isRequired
};

export default Settings;
