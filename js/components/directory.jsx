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
            <h2>Level 1: Nouns</h2>
            <ul className="lessons">
              <DirectoryLink level='1' lesson='1' title='Lesson 1: Creatures of Essos' />
              <DirectoryLink level='1' lesson='2' title='Lesson 2: Nature and Landscapes' />
              <DirectoryLink level='1' lesson='3' title='Lesson 3: Positions and Warfare' />
              <DirectoryLink level='1' lesson='4' title='Lesson 4: Seasons and the Elements' />
              <DirectoryLink level='1' lesson='5' title='Lesson 5: Family' />
            </ul>
          </li>
          <li>
            <h2>Level 2: Numbers, Pronouns, and Interjections</h2>
            <ul className="lessons">
              <DirectoryLink level='2' lesson='1' title='Lesson 1: Numbers - Part 1' />
              <DirectoryLink level='2' lesson='2' title='Lesson 2: Numbers - Part 2' />
              <DirectoryLink level='2' lesson='3' title='Lesson 3: Pronouns' />
              <DirectoryLink level='2' lesson='4' title='Lesson 4: Interjections' />
              <DirectoryLink level='2' lesson='5' title='Lesson 5: Horse Commands' />
            </ul>
          </li>
          <li>
            <h2>Level 3: Adjectives and Adverbs</h2>
            <ul className="lessons">
              <DirectoryLink level='3' lesson='1' title='Lesson 1: Colors' />
              <DirectoryLink level='3' lesson='2' title='Lesson 2: Description of a Dothraki' />
              <DirectoryLink level='3' lesson='3' title='Lesson 3: Other Useful Adjectives' />
              <DirectoryLink level='3' lesson='4' title='Lesson 4: Adverbs - Part 1' />
              <DirectoryLink level='3' lesson='5' title='Lesson 5: Adverbs - Part 2' />
            </ul>
          </li>
          <li>
            <h2>Level 4: Verbs - Part 1</h2>
            <ul className="lessons">
              <DirectoryLink level='4' lesson='1' title='Lesson 1: Dothraki Life' />
              <DirectoryLink level='4' lesson='2' title='Lesson 2: Actions with Animals' />
              <DirectoryLink level='4' lesson='3' title='Lesson 3: Actions on Objects' />
              <DirectoryLink level='4' lesson='4' title='Lesson 4: Power Dynamics' />
              <DirectoryLink level='4' lesson='5' title='Lesson 5: The Body and the Senses' />
            </ul>
          </li>
          <li>
            <h2>Level 5: Verbs - Part 2</h2>
            <ul className="lessons">
              <DirectoryLink level='5' lesson='1' title='Lesson 1: Barbaric Actions' />
              <DirectoryLink level='5' lesson='2' title='Lesson 2: Actions of a Healthy Lifestyle' />
              <DirectoryLink level='5' lesson='3' title='Lesson 3: Actions of a Great Leader' />
              <DirectoryLink level='5' lesson='4' title='Lesson 4: Actions of Dothraki Women' />
              <DirectoryLink level='5' lesson='5' title='Lesson 5: Other Useful Verbs' />
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Directory;
