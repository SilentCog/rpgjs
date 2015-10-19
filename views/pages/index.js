var React = require('react');

var Default = require('../layouts/default');
var Game = require('../components/game');
var Selector = require('../components/selector');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    scripts: React.PropTypes.array,
    local: React.PropTypes.bool
  },
  render: function () {
    return (
      <Default title={this.props.title} scripts={this.props.scripts}>
        <h1>Welcome to the (local) Game</h1>
        <div id="game">
          <Game />
        </div>
        <div id="selector">
          <Selector />
        </div>
        <div className="hint">click <a href={ (this.props.local) ? '/remote-game' : '/' }>here</a> to use the "{ (this.props.local) ? 'remote' : 'local' }" version</div>
      </Default>
    );
  }
});
