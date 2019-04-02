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
            <Typography>
              <h3 className="pageContainerTitle">
                <FormattedMessage id="plugins.documentation.headline" /> Beispiel
              </h3>
              <small>
                <FormattedMessage id="plugins.documentation.subheadline" />
              </small>
            </Typography>
            <br /><br />
            <Card className="pluginCard">
              <CardContent className="pluginCardContent" style={{ paddingBottom: '10px' }}>
                <Markdown
                  options={{
                    overrides: {
                        table: {
                          component: Table,
                        },
                        thead: {
                          component: TableHead,
                          props: {
                            className: 'TableRow',
                          },
                        },
                        td: {
                          component: TableCell,
                        },
                        th: {
                          component: TableCell,
                        },
                        tr: {
                          component: TableRow,
                        },
                      },
                  }}>
                  {DocumentationText}
                </Markdown>
              </CardContent>
            </Card>
          </DialogContent>
      </Dialog>
    );
  }
}

Documentation.propTypes = {
  onClose: PropTypes.func,
};

export default (Documentation);
