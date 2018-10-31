/*global google */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {Segment, Form, Button, Grid, Header} from 'semantic-ui-react'
import {createEvent, updateEvent} from "../eventActions";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import TextInput from '../../../app/common/form/TextInput'
import TextAreaInput from '../../../app/common/form/TextAreaInput'
import SelectInput from '../../../app/common/form/SelectInput'
import DateInput from '../../../app/common/form/DateInput'
import PlaceInput from '../../../app/common/form/PlaceInput'
import Script from 'react-load-script'
import moment from 'moment'
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import cuid from 'cuid'

const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: "The event title is required"}),
  category: isRequired({message: "Please provide a category"}),
  description: composeValidators(
    isRequired({message: "Please provide a description"}),
    hasLengthGreaterThan(4)({message: "Description needs to be at least 5 ch."})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {

  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({scriptLoaded: true})
  };

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('city', selectedCity)
      })
  };

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  };

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: "Bob"
      };

      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  render() {
    const {invalid, submitting, pristine} = this.props;
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA568s1opcYr0jFqVrfFClxaSGSH1P6x4A&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details"/>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" type="text" component={TextInput} placeholder="Giver your event a name"/>
              <Field name="category" type="text"
                     component={SelectInput}
                     options={category}
                     placeholder="What is your event about"/>
              <Field name="description" type="text" rows={3} component={TextAreaInput}
                     placeholder="Tell us about your event"/>
              <Header sub color="teal" content="Event Location Details"/>
              <Field name="city" type="text"
                     component={PlaceInput}
                     onSelect={this.handleCitySelect}
                     options={{types: ['(cities)']}}
                     placeholder="Event City"/>
              {this.state.scriptLoaded &&
              <Field name="venue" type="text" component={PlaceInput}
                     options={{
                       types: ['establishment'],
                       location: new google.maps.LatLng(this.state.cityLatLng),
                       radius: 1000
                     }}
                     onSelect={this.handleVenueSelect}
                     placeholder="Event venue"/>
              }
              <Field name="date" type="text"
                     component={DateInput}
                     dateFormat='YYYY-MM-DD HH:mm'
                     timeFormat='HH:mm'
                     showTimeSelect
                     placeholder="Date and Time of event"
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {initialValues: event};
};

const actions = {
  createEvent,
  updateEvent
};

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'eventForm',
  enableReinitialize: true,
  validate
})(EventForm));