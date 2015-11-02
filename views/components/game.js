var React = require('react');
var ReactDom = require('react-dom');

var GameEngine = require('../../source/game-engine/local-game');

var Selector = require('./selector');

var gameLines = [];

module.exports = React.createClass({
  propTypes: {
    defaultGame: React.PropTypes.object,
    games: React.PropTypes.object
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
    ReactDom.findDOMNode(this.refs.gameInput).focus();
  },
  initializeGame: function () {
    this.game = GameEngine.NewGame(this.props.defaultGame, this.updateText);
  },
  reInitializeGame: function (game) {
    gameLines = [];
    this.game = GameEngine.NewGame(this.props.games[game], this.updateText);
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
      <section ref="game">
        <div id="GameArea">
          { lines }
        </div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" id="GameInput" ref="gameInput" />
          <input type="submit"
            style={style}
            tabIndex="-1" />
        </form>
        <div id="selector">
          <Selector handleSelect={this.reInitializeGame} selectValues={this.props.games} />
        </div>
      </section>
    );
  }
});
