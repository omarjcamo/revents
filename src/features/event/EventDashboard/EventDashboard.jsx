import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import EventList from '../EventList/EventList'
import {connect} from 'react-redux'
import {deleteEvent} from "../eventActions";
import EventActivity from '../EventActivity/EventActivity'
import LoadingComponent from '../../../app/layout/LoadingComponent'

class EventDashboard extends Component {

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const {events} = this.props;
    if (!isLoaded(events) || isEmpty(events)) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent}
                     events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity/>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateoProps = (state) => ({
  events: state.firestore.ordered.events
});

const actions = {
  deleteEvent
};

export default connect(mapStateoProps, actions)(
  firestoreConnect([{collection: 'events'}])(EventDashboard)
);