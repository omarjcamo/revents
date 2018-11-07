import React, {Component} from 'react';
import {Button, Form} from "semantic-ui-react";
import {Field, reduxForm} from 'redux-form'
import TextareaInput from '../../../app/common/form/TextAreaInput'

class EventDetailedChatForm extends Component {

  handleCommentSubmit = values => {
    const {addEventComment, reset, eventId, closeForm, parentId} = this.props;
    addEventComment(eventId, values, parentId);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };

  render() {
    return (
      <Form reply onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field
          name='comment'
          type='text'
          component={TextareaInput}
          rows={2}
        />
        <Button
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}

export default reduxForm({Fields: 'comment'})(EventDetailedChatForm);