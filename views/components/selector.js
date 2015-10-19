var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div id="GameSelectBox" className="hint radioBox">
        <input type="radio" name="GameSelect" id="GameSelect_Mansion" value="the-mansion" checked readOnly />
        <label for="GameSelect_Mansion">The Mansion</label>
        <input type="radio" name="GameSelect" id="GameSelect_Simple" value="simple-game" readOnly />
        <label for="GameSelect_Simple">Simple Game</label>
      </div>
    );
  }
});



