import React from 'react';
import { Link } from 'react-router-dom'

export default class UserPage extends React.Component {
  render() {
    const p = this.props;
    return (
      <header>
        <nav>
          <a href="/" className="app-name">Drag Race Brackets</a>
          <ul className="main-menu">
            <li className="main-item active">
              <a href={`/u/${p.id}`}>You</a>
            </li>
            <li className="main-item">
              <a href="/groups">Them</a>
            </li>
            <li className="secondary-item">
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
      </header>   
    );
  }
}