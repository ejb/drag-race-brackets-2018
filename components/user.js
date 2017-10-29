import React from 'react';
import BracketList from './bracket-list';

export default class UserPage extends React.Component {
  render() {
    return (
    
      <main className="your-bracket">

        <h1>Elliot Bentley’s bracket</h1>

        <section>
          <div className="score-so-far">
            <span className="number">0</span>
            <span className="caption">points (so far)</span>
          </div>
        </section>

        <section>
          <BracketList />
        </section>


      </main>
    );
  }
}
