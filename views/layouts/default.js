var React = require('react');

var Scripts = require('../components/scripts');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    scripts: React.PropTypes.array
  },
  render: function () {
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width" />
          <title>{ this.props.title }</title>
          <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet" type="text/css" />
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
