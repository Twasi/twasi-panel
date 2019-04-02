import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import ReactMarkdown from 'react-markdown/with-html';
import DocumentationText from './documentationText.jsx';

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
                <FormattedMessage id="plugins.documentation.headline" />
              </h3>
              <small>
                <FormattedMessage id="plugins.documentation.subheadline" />
              </small>
            </Typography>
            <br /><br />
            <Card className="pluginCard">
              <CardContent className="pluginCardContent" style={{ paddingBottom: '10px' }}>
                <ReactMarkdown source={DocumentationText} escapeHtml="true" />
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
