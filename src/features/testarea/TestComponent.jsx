import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {incrementAsync, decrementAsync,} from "./testActions";
import {openModal} from "../modals/modalActions";

class TestComponent extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptLoaded: false
  };

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  };

  handleScriptLoad = () => {
    this.setState({scriptLoaded: true})
  };

  onChange = (address) => this.setState({address})

  render() {
    const {data, incrementAsync, decrementAsync, openModal, loading} = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA568s1opcYr0jFqVrfFClxaSGSH1P6x4A&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area: {data}</h1>
        <Button loading={loading} onClick={incrementAsync} color="green" content="Increment"/>
        <Button loading={loading} onClick={decrementAsync} color="red" content="Decrement"/>
        <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="Open Modal"/>
        <br/><br/>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded &&
          <PlacesAutocomplete inputProps={inputProps}/>}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};

export default connect(mapStateToProps, actions)(TestComponent);