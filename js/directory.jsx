var React = require('react');

var Header = require('./header');
var DirectoryLink = require('./directory-link')

var Directory = React.createClass({
  render: function() {
    return(
      <div className='directory'>
        <Header cls='header2'/>
        <ul className="levels">
          <li>
            <DirectoryLink level='1' lesson='1' title='Level 1: Nouns' type='h2' />
            <ul className="lessons">
              <DirectoryLink level='1' lesson='1' title='Lesson 1: Creatures of Essos' type='li' />
              <DirectoryLink level='1' lesson='2' title='Lesson 2: Nature and Landscapes' type='li' />
              <DirectoryLink level='1' lesson='3' title='Lesson 3: Positions and Warfare' type='li' />
              <DirectoryLink level='1' lesson='4' title='Lesson 4: Seasons and the Elements' type='li' />
              <DirectoryLink level='1' lesson='5' title='Lesson 5: Family' type='li' />
            </ul>
          </li>
          <li>
            <DirectoryLink level='2' lesson='1' title='Level 2: Numbers, Pronouns, and Interjections' type='h2' />
            <ul className="lessons">
            </ul>
          </li>
          <li>
            <DirectoryLink level='3' lesson='1' title='Level 3: Adjectives and Adverbs' type='h2' />
            <ul className="lessons">
            </ul>
          </li>
          <li>
            <DirectoryLink level='3' lesson='1' title='Level 4: Transitive Verbs' type='h2' />
            <ul className="lessons">
            </ul>
          </li>
          <li>
            <DirectoryLink level='3' lesson='1' title='Level 5: Intransitive Verbs' type='h2' />
            <ul className="lessons">
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Directory;
