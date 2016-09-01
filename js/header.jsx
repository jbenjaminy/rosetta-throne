var React = require('react');

var Header = React.createClass({

  render: function() {
    return(
    	<div className={this.props.cls}>
    		<div className='title'><h1 className='rosetta'>Rosetta</h1><img src='./throne.png' className='throne'/><div className='course'><h2 className='dothraki'>DOTHRAKI</h2><hr/><h3>Level 1, 2, 3, 4, 5</h3></div><img src='./wolf.png' className='wolf'/></div>
		</div>   
    );
  }
});

module.exports = Header;