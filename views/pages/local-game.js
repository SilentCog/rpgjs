var React = require('react');

var Default = require('../layouts/default');
var Interface = require('../components/game-interface.js');
var Selector = require('../components/selector.js');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    scripts: React.PropTypes.array
  },
  render: function () {
    return (
      <Default title={this.props.title} scripts={this.props.scripts}>
        <h1>Welcome to the (local) Game</h1>
        <Interface />
        <Selector />
        <div className="hint">click <a href="/remote-game">here</a> to use the "remote" version</div>
      </Default>
    );
  }
});
