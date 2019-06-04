import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import Markdown from 'markdown-to-jsx';
import DocumentationText from './documentationText.jsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Documentation extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  render() {
    const { onClose, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Markdown
            options={{
              overrides: {
                table: {
                  component: Table
                },
                thead: {
                  component: TableHead
                },
                td: {
                  component: TableCell,
                  props: {
                    className: 'TableRowThin'
                  }
                },
                th: {
                  component: TableCell,
                  props: {
                    className: 'TableRow'
                  }
                },
                tr: {
                  component: TableRow
                },
                h2: {
                  props: {
                    className: 'noMarginTop'
                  }
                },
                strong: {
                  props: {
                    className: 'parameter'
                  }
                }
              }
            }}>
            {DocumentationText}
          </Markdown>
        </DialogContent>
      </Dialog>
    );
  }
}

Documentation.propTypes = {
  onClose: PropTypes.func
};

export default (Documentation);
