var React = require('react');

module.exports = React.createClass({
  propTypes: {
    handleSelect: React.PropTypes.func,
    selectValues: React.PropTypes.object
  },
  handleClick: function (e) {
    this.props.handleSelect(e.target.value);
  },
  render: function () {
    var items = Object.keys(this.props.selectValues);
    items = items.map(function (item, index) {
      return (
        <span key={item}>
          <input type="radio" value={item} onClick={this.handleClick} />
          <label>{item}</label>
        </span>
      );
    });
    return (
      <div id="GameSelectBox" className="hint radioBox">
        { items }
      </div>
    );
  }
});
