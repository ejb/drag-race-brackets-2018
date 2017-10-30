import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default class SplashPage extends React.Component {
  render() {
    const responseFacebook = (response) => {
      console.log(response);
    }
    const componentClicked = () => {};
    
    return (
      <main>
      
        <div className="splash-screen">
      
          <p>Create your bracket now for All-Stars Season 3!</p>
          <a href="/auth/facebook">Sign up with Facebook</a>
      
        </div>
      
      </main>
    );
  }
}