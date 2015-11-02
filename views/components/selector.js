var React = require('react');

module.exports = React.createClass({
  propTypes: {
    handleSelect: React.PropTypes.func,
    selectValues: React.PropTypes.object
  },
  handleClick: function (item) {
    this.props.handleSelect(item);
  },
  render: function () {
    var that = this;
    var items = Object.keys(this.props.selectValues);
    items = items.map(function (item, index) {
      return (
        <input key={item} type="button" value={item} name={item} onClick={that.handleClick.bind(that, item)} />
      );
    });
    return (
      <div id="GameSelectBox">
        { items }
      </div>
    );
  }
});
