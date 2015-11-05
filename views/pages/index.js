var React = require('react');

var Default = require('../layouts/default');
var Game = require('../components/game');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    scripts: React.PropTypes.array,
    local: React.PropTypes.bool
  },
  render: function () {
    return (
      <Default title={this.props.title} scripts={this.props.scripts}>
        <h1>Welcome to the ({ (this.props.local) ? 'local' : 'remote' }) Game</h1>
        <div id="game" />
        <div className="hint">click <a href={ (this.props.local) ? '/remote-game' : '/' }>here</a> to use the "{ (this.props.local) ? 'remote' : 'local' }" version</div>
      </Default>
    );
  }
});
