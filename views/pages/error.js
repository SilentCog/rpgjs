var React = require('react');

var Default = require('../layouts/default');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    error: React.PropTypes.number,
    message: React.PropTypes.string
  },
  render: function () {
    return (
      <Default title={this.props.title}>
        <h1>{this.props.error} Error</h1>
        <p>{ this.props.message }</p>
      </Default>
    );
  }
});
