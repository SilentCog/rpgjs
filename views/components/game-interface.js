var React = require('react');

var Default = require('../layouts/default');
var Interface = require('./game.js');
var Selector = require('./selector.js');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    scripts: React.PropTypes.array,
    local: React.PropTypes.bool
  },
  render: function () {
    return (
      <section>
        <Interface />
        <Selector />
      </section>
    );
  }
});
