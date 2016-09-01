var React = require('react');
var Header = require('./header');

var LandingPage = React.createClass({

  render: function() {
    return(
    	<div className='landingPage'>
    		<Header cls='header'/>
    	</div>
    );
  }
});

module.exports = LandingPage;
