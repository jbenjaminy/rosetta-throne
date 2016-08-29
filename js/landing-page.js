var React = require('react');
var router = require('react-router');
var Link = router.Link;

var LandingPage = React.createClass({

  render: function() {
    return(
        <Link to={'/practice'} className="links">Start learning</Link>
    );
  }
});

module.exports = LandingPage;
