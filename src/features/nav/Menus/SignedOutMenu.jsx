import React from 'react';
import Menu from "semantic-ui-react/dist/es/collections/Menu/Menu";
import {Button} from "semantic-ui-react";

const SignedOutMenu = ({signIn}) => {
  return (
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={signIn}/>
      <Button basic inverted content="Register" style={{marginLeft: '0.5em'}}/>
    </Menu.Item>
  );
};

export default SignedOutMenu;