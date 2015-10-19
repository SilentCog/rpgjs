var React = require('react');

module.exports = React.createClass({
  propTypes: {
    scripts: React.PropTypes.array
  },
  render: function () {
    var items;

    if (typeof this.props.scripts === 'undefined') {
      //items = <script src="/js/app.js" />;
    } else {
      items = this.props.scripts.map(function (item, index) {
        return (
          <script key={ item } src={ item } />
        );
      });
    }
  
    return (
      <span>
        { items }
      </span>
    );
  }
});
