var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var actions = require('./actions');
var Header = require('./header');

var Directory = React.createClass({
  getPreview: function(level, lesson) {
    this.props.dispatch(actions.fetchPreview(level, lesson));
    this.props.dispatch(actions.updateLevel(level, lesson));
  },
  render: function() {
    return(
      <div>
        <Header cls='header2'/>
        <ul className="levels">
          <li>
            <Link to={'/practice'} onClick={this.getPreview(1, 1)}><h2>Level 1: Nouns</h2></Link>
            <ul className="lessons">
              <li><Link to={'/practice'} onClick={this.getPreview(1, 1)}>LESSON 1, Creatures of Essos</Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview(1, 2)}>LESSON 2, Nature and Landscapes</Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview(1, 3)}>LESSON 3, Positions and Warfare </Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview(1, 4)}>LESSON 4, Seasons and the Elements</Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview(1, 5)}>LESSON 5, Family</Link></li>
            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview(2, 1)}><h2>LEVEL 2, NUMBERS, PRONOUNS, AND INTERJECTIONS</h2></Link>
            <ul className="lessons">

            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview(3, 1)}><h2>LEVEL 3, ADJECTIVES AND ADVERBS</h2></Link>
            <ul className="lessons">

            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview(4, 1)}><h2>LEVEL 4, TRANSITIVE VERBS</h2></Link>
            <ul className="lessons">

            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview(5, 1)}><h2>LEVEL 5, INTRANSITIVE VERBS</h2></Link>
            <ul className="lessons">

            </ul>
          </li>
        </ul>


      </div>
    );
  }
});

module.exports = connect()(Directory);
