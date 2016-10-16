var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var Header = require('./header');

var Directory = React.createClass({
  getPreview: function(level, lesson) {
    var props = this.props;
    return function() {
      props.dispatch(actions.fetchPreview(level, lesson));
      props.dispatch(actions.updateLevel(level, lesson));
    }
  },

  render: function() {
    return(
      <div className='directory'>
        <Header cls='header2'/>
        <ul className="levels">
          <li>
            <Link to={'/practice'} onClick={this.getPreview('1', '1')}><h2>Level 1: Nouns</h2></Link>
            <ul className="lessons">
              <li><Link to={'/practice'} onClick={this.getPreview('1', '1')}>Lesson 1: Creatures of Essos</Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview('1', '2')}>Lesson 2: Nature and Landscapes</Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview('1', '3')}>Lesson 3: Positions and Warfare </Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview('1', '4')}>Lesson 4: Seasons and the Elements</Link></li>
              <li><Link to={'/practice'} onClick={this.getPreview('1', '5')}>Lesson 5: Family</Link></li>
            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview('2', '1')}><h2>Level 2: Numbers, Pronouns, and Interjections</h2></Link>
            <ul className="lessons">
            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview('3', '1')}><h2>Level 3: Adjectives and Adverbs</h2></Link>
            <ul className="lessons">
            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview('4', '1')}><h2>Level 4: Transitive Verbs</h2></Link>
            <ul className="lessons">
            </ul>
          </li>

          <li>
            <Link to={'/practice'} onClick={this.getPreview('5', '1')}><h2>Level 5: Intransitive Verbs</h2></Link>
            <ul className="lessons">
            </ul>
          </li>
        </ul>


      </div>
    );
  }
});

module.exports = connect()(Directory);
