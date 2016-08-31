/* <h1 className='rosetta'>Rosetta</h1><img src='./throne.png' className='throne'/><img src='./wolf.png'/>
			<div className='course'><h2 className='dothraki'>DOTHRAKI</h2><hr/><h3>Level 1, 2, 3, 4, 5</h3></div>*/

var React = require('react');

var Header = React.createClass({

  render: function() {
    return(
    	<div className='header'>
    		<h2 className='languages a'>OLD GHISCARI</h2>
    		<h2 className='languages c'>BRAAVOSI</h2>
			<h3 className='languages b'>HIGH VALYRIAN</h3>
			<h3 className='languages r'>SKROTH</h3>
			<div className='title'></div>
			<h2 className='languages e'>LHAZAREEN</h2>
			<h3 className='languages d'>LORATHI</h3>
			<div className='images'><img src='./dothraki.jpg' className='one'/><img src='./dothraki5.jpg' className='five'/><img src='./dothraki3.jpg' className='three'/><img src='./dothraki6.png' className='six'/><img src='./dothraki7.jpg' className='seven'/><img src='./dothraki2.jpg' className='two'/><img src='./dothraki4.jpg' className='four'/></div>
			<h3 className='languages j'>TYROSHI</h3>
			<h2 className='languages k'>VOLANTENE</h2>
			<h2 className='languages o'>QARTH</h2>
			<h3 className='languages n'>ASSHAI'I</h3>
			
			
			
    	</div>   
    );
  }
});

module.exports = Header;