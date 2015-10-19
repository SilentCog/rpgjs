var React = require('react');

var Scripts = require('./components/scripts');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    scripts: React.PropTypes.array
  },
  render: function () {
    return (
      <html>
        <head>
          <title>{ this.props.title }</title>
          <link rel="stylesheet" href="/css/game.css" />
        </head>
        <body>
          { this.props.children }
          <Scripts scripts={this.props.scripts} />
        </body>
      </html>
    );
  }
});
