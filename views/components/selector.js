var React = require('react');

module.exports = React.createClass({
  propTypes: {
    handleSelect: React.PropTypes.func,
    selectValues: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      activeIndex: 0
    };
  },
  handleClick: function (item, index) {
    this.props.handleSelect(item);
    this.setState({
      activeIndex: index
    });
  },
  render: function () {
    var that = this;
    var items = Object.keys(this.props.selectValues);
    items = items.map(function (item, index) {
      return (
        <input
          key={item}
          className={ (that.state.activeIndex === index) ? 'active' : '' }
          type="button"
          value={item}
          name={item}
          onClick={that.handleClick.bind(that, item, index)} />
      );
    });
    return (
      <div id="GameSelectBox">
        { items }
      </div>
    );
  }
});
