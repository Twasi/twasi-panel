import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CardContent from '@material-ui/core/CardContent';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

class SetupPlugins extends Component {
  componentDidMount() {
    const { updatePlugins } = this.props;
    updatePlugins(this.state.page);
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  renderPagination() {
    const { pagination, updatePlugins } = this.props;
    return (
      <Paper style={{ textAlign: 'center' }} className="pageContainer">
      {_.times(pagination.pages, i =>
        <Fab
          onClick={() => {
            updatePlugins(i+1)
            this.setState({ page: i+1});
          }}
          style={{ marginLeft: '5px', marginRight: '5px' }}
          size="small"
          disabled={i+1 === this.state.page}
          color={i+1 === this.state.page ? "default" : "primary"}
        >
        {i+1}
        </Fab>
      )}
      </Paper>
    );
  }

  render() {
    const { plugins, installPlugin, uninstallPlugin } = this.props;

    const renderedPlugins = plugins.map(plugin => (
      <TableBody>
        <TableRow>
          <TableCell>
            {plugin.name}
          </TableCell>
          <TableCell>
            {plugin.description}
          </TableCell>
          <TableCell>
          {plugin.isInstalled && (
            <div>
              <Button
                variant="contained"
                color="secondary"
                disabled={plugin.actionInProgress}
                onClick={() => uninstallPlugin(plugin.id)}
              >
                <FormattedMessage id="plugins.uninstall" />
                {plugin.actionInProgress && (
                  <CircularProgress
                    color="primary"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: -12,
                      marginLeft: -12
                    }}
                    size={24}
                  />
                )}
              </Button>
            </div>
          )}
          {!plugin.isInstalled && (
            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={plugin.actionInProgress}
                onClick={() => installPlugin(plugin.id)}
              >
                <FormattedMessage id="plugins.install" />
                {plugin.actionInProgress && (
                  <CircularProgress
                    color="primary"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: -12,
                      marginLeft: -12
                    }}
                    size={24}
                  />
                )}
              </Button>
            </div>
          )}
          </TableCell>
        </TableRow>
      </TableBody>
    ));
    return (
      <div>
        <Typography>
          <h3>Plugins</h3>
            <small>
              Hier kannst du auswählen, welche Plugins du aktiviert bzw.
              deaktiviert haben möchtest.<br /> Plugins beinhalten den
              kompletten Funktionsumfang von Twasi.<br />
              Es gibt Plugins, die du nicht deaktivieren kannst, da sie
              essentiell für den Betrieb des Bots sind.<br />
              <br />
              Alle Plugins lassen sich auch im nachhinein noch aktivieren,
              deaktivieren und einstellen.
            </small>
        </Typography>
        <Card style={{ marginTop: '25px' }} className="pluginCard">
          <CardContent className="pluginCardContent anim">
            <Table style={{ marginTop: '25px' }}>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>
                    Plugin
                  </TableCell>
                  <TableCell>
                    Beschreibung
                  </TableCell>
                  <TableCell>
                    Installieren / Deinstallieren
                  </TableCell>
                </TableRow>
              </TableHead>
              {renderedPlugins}
            </Table>
            {this.props.pagination.pages !== 1 && this.renderPagination()}
          </CardContent>
        </Card>
      </div>
    );
  }
}

SetupPlugins.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  verifyData: PropTypes.func.isRequired,
  installPlugin: PropTypes.func.isRequired,
  uninstallPlugin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  plugins: pluginsSelectors.getPlugins(state),
  isLoading: pluginsSelectors.isLoading(state),
  pagination: pluginsSelectors.getPagination(state)
});

const mapDispatchToProps = dispatch => ({
  installPlugin: name => dispatch(pluginsOperations.installPlugin(name)),
  uninstallPlugin: name => dispatch(pluginsOperations.uninstallPlugin(name)),
  updatePlugins: page => dispatch(pluginsOperations.loadData(page)),
  updateQuery: query => dispatch(pluginsOperations.updateQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupPlugins);
