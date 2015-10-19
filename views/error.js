var React = require('react');

module.exports = React.createClass({
  propTypes: {
    error: React.PropTypes.object
  },
  render: function () {
    return (
      <html>
        <head>
          <title>Error</title>
          <link rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        <body>
          { this.props.error.stack }
        </body>
      </html>
    );
  }
});
