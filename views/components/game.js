var React = require('react');

var GameEngine = require('../../source/game-engine/local-game');

var gameLines = [];

module.exports = React.createClass({
  propTypes: {
    game: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      data: {
        textValue: gameLines
      }
    };
  },
  componentDidMount: function () {
    this.initializeGame();
  },
  initializeGame: function () {
    this.game = GameEngine.NewGame(this.props.game, this.updateText);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    // add user command to 'screen'
    this.updateText(this.refs.gameInput.value);
    // add game output to 'screen'
    this.game(this.refs.gameInput.value);
    // clear input
    this.refs.gameInput.value = '';
  },
  updateText: function (text) {
    gameLines.push(text);
    var newValue = gameLines;
    this.setState({
      data: {
        textValue: newValue
      }
    });
  },
  render: function () {
    var style = {
      position: 'absolute', left: '-9999px', width: '1px', height: '1px'
    };
    var lines = this.state.data.textValue.map(function (item, index) {
      return (
        <div key={index}>
          <span className="lineIndicator">&gt;</span>
          <span className="gameText">{ item }</span>
        </div>
      );
    });
    return (
      <section>
        <div id="GameArea">
          { lines }
        </div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" id="GameInput" ref="gameInput" />
          <input type="submit"
            style={style}
            tabIndex="-1" />
        </form>
      </section>
    );
  }
});
