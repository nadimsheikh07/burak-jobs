import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLogin }) => {
  const responseFacebook = (response) => {
    // Handle the Facebook login response
    onLogin(response);
  };

  return (
    <FacebookLogin
      appId="387647660747503"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      textButton="Login with Facebook"
    />
  );
};

export default FacebookLoginButton;
