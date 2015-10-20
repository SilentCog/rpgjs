var React = require('react');

var GameEngine = require('../../source/game-engine/local-game');

module.exports = React.createClass({
  propTypes: {
    game: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      textValue: ''
    };
  },
  componentWillMount: function () {
    this.initializeGame();
  },
  initializeGame: function () {
    this.game = GameEngine.NewGame(this.props.game, this.updateText);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.game(this.refs.gameInput.value);
  },
  updateText: function (text) {
    this.setState({textValue: text});
  },
  render: function () {
    var style = {
      position: 'absolute', left: '-9999px', width: '1px', height: '1px'
    };
    return (
      <section>
        <div id="GameArea">
          { this.state.textValue }
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
