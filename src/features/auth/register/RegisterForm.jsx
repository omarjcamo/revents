import React from 'react';
import {connect} from 'react-redux'
import {Form, Segment, Button, Label, Divider} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import {combineValidators, isRequired} from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import {registerUser} from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";

const validate = combineValidators({
  displayName: isRequired('display name'),
  email: isRequired('email'),
  password: isRequired('password')
});

const RegisterForm = ({registerUser, handleSubmit, error, invalid, submitting}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {
            error && <Label basic color="red">{error}</Label>
          }
          <Button fluid size="large" color="teal" disabled={invalid || submitting}>
            Register
          </Button>
          <Divider horizontal>
            Or
          </Divider>
          <SocialLogin/>
        </Segment>
      </Form>
    </div>
  );
};

const actions = {
  registerUser
};

export default connect(null, actions)(reduxForm({form: 'registerForm', validate})(RegisterForm));