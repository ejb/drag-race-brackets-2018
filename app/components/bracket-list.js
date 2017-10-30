import React from 'react';


export default class BracketList extends React.Component {
  render() {
    
    const CONTESTANTS = [
      { name: 'Aja' },
      { name: 'BenDeLaCreme' },
      { name: 'Chi Chi DeVayne' },
      { name: 'Kennedy Davenport' },
      { name: 'Milk' },
      { name: 'Morgan McMichaels' },
      { name: 'Shangela' },
      { name: 'Thorgy Thor' },
      { name: 'Trixie Mattel' }
    ];
    
    const contestantsMarkup = CONTESTANTS.map(queen => (
      <li className="queen-profile">
        <div className="vital-stats">
          <img className="photo" src="https://ejb.github.io/dragrace9/img/Aja.jpg" />
          <div className="name">{queen.name}</div>
          <div className="hometown">Brooklyn, New York</div>
        </div>
        <div className="scoring">
          <div className="">Prediction: <b>2nd place</b></div>
          <div className="">Outcome: <b>TBD</b></div>
          <div className="">Points won: <b>TBD</b></div>
        </div>
      </li>
    ));
    
    return (
      <div className="bracket-list">

        <ul className="">
          {contestantsMarkup}
        </ul>
      </div>
    );
  }
}