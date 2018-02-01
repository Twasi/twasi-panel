import React, { Component } from 'react';
import { Card, Table, Input, Button, Icon, Tooltip, Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';

const ButtonGroup = Button.Group;

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    command: `!befehl${i}`,
    output:
      'Ich bin eine sehr lange Ausgabe, um zu testen, wie sich die Tabelle verhält, wenn die Ausgabe sehr lang ist.',
    access: 'Zuschauer',
    uses: `${i}`
  });
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input
        style={{ margin: '-5px 0' }}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    ) : (
      value
    )}
  </div>
);

class Commands extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Befehl',
        dataIndex: 'command',
        render: (text, record) => this.renderColumns(text, record, 'command')
      },
      {
        title: 'Ausgabe',
        width: '50%',
        dataIndex: 'output',
        render: (text, record) => this.renderColumns(text, record, 'output')
      },
      {
        title: 'Zugriff',
        dataIndex: 'access',
        render: (text, record) => this.renderColumns(text, record, 'access')
      },
      {
        title: 'Ausgeführt',
        dataIndex: 'uses',
        render: (text, record) => this.renderColumns(text, record, 'uses')
      },
      {
        title: 'Optionen',
        dataIndex: 'options',
        width: '10%',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <ButtonGroup>
                    <Tooltip title="Speichern">
                      <Button type="primary">
                        <a onClick={() => this.save(record.key)}>
                          <Icon type="check" />
                        </a>
                      </Button>
                    </Tooltip>
                    <Tooltip title="Abbrechen">
                      <Button type="danger">
                        <a onClick={() => this.cancel(record.key)}>
                          <Icon type="close" />
                        </a>
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </span>
              ) : (
                <ButtonGroup>
                  <Tooltip title="Bearbeiten">
                    <Button>
                      <a onClick={() => this.edit(record.key)}>
                        <Icon type="edit" />
                      </a>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Löschen">
                    <Button type="danger">
                      <Icon type="delete" />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              )}
            </div>
          );
        }
      }
    ];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  render() {
    return (
      <div>
        <Card>
          <Row gutter={24} type="flex" justify="center">
            <Col span={12}>
              <h2>
                <FormattedMessage id="commands.title" />
              </h2>
            </Col>
            <Col span={12}>
              <Button type="primary" style={{ float: 'right' }}>
                <Icon type="plus" />
                <FormattedMessage id="commands.addcommand" />
              </Button>
            </Col>
          </Row>
          <Row gutter={24}>
            <Table dataSource={this.state.data} columns={this.columns} />
          </Row>
        </Card>
      </div>
    );
  }
}

export default Commands;
