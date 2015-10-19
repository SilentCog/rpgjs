var React = require('react');

var Default = require('./default');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    scripts: React.PropTypes.array
  },
  render: function () {
    return (
      <Default title={this.props.title} scripts={this.props.scripts}>
        <h1>Welcome to the (local) Game</h1>
        <div id="GameArea"></div>
        <input type="text" id="GameInput" />
        <div id="GameSelectBox" className="hint radioBox">
          <input type="radio" name="GameSelect" id="GameSelect_Mansion" value="the-mansion" checked="true" />
          <label for="GameSelect_Mansion" >The Mansion</label>
          <input type="radio" name="GameSelect" id="GameSelect_Simple"  value="simple-game" />
          <label for="GameSelect_Simple"  >Simple Game</label>
        </div>
        <div className="hint">click <a href="/remote-game">here</a> to use the "remote" version</div>
      </Default>
    );
  }
});
