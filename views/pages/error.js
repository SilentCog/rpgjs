var React = require('react');

var Default = require('../layouts/default');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    error: React.PropTypes.object
  },
  render: function () {
    return (
      <Default title={this.props.title}>
        { this.props.error.stack }
      </Default>
    );
  }
});
