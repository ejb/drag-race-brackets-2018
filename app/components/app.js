import React from 'react';
import { Link } from 'react-router';
import HeaderComponent from './header';

export default class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        { this.props.children }
      </div>
    );
  }
}
