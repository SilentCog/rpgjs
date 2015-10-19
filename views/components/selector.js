var React = require('react');

module.exports = React.createClass({
  handleClick: function (e) {
    console.log('click');
  },
  render: function () {
    return (
      <div id="GameSelectBox" className="hint radioBox">
        <input type="radio" name="GameSelect" id="GameSelect_Mansion" value="the-mansion" onClick={this.handleClick} />
        <label htmlFor="GameSelect_Mansion">The Mansion</label>
        <input type="radio" name="GameSelect" id="GameSelect_Simple" value="simple-game" onClick={this.handleClick} />
        <label htmlFor="GameSelect_Simple">Simple Game</label>
      </div>
    );
  }
});
