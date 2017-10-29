import React from 'react';
import SplashPage from './splash';

export default class IndexComponent extends React.Component {
  render() {
    let loggedIn = false;
    if (loggedIn) {
      return (
        <div>
          Logged-in user
        </div>
      );
    } else {
      return (
        <SplashPage />
      );
    }
  }
}
