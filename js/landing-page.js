var React = require('react');
var router = require('react-router');
var Link = router.Link;

var LandingPage = React.createClass({
  render: function() {
    return(
      <button type="button">
        <Link to={'/practice'} className="links">Start learning</Link>
      </button>
    );
  }
});

module.exports = LandingPage;
