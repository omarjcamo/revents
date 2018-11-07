import React, {Component} from 'react'
import {Grid, Loader} from 'semantic-ui-react'
import {firestoreConnect} from 'react-redux-firebase'
import EventList from '../EventList/EventList'
import {connect} from 'react-redux'
import {getEventsForDashboard} from "../eventActions";
import EventActivity from '../EventActivity/EventActivity'
import LoadingComponent from '../../../app/layout/LoadingComponent'

class EventDashboard extends Component {

  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      })
    }
  }

  getNextEvents = async () => {
    const {events, getEventsForDashboard} = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      })
    }
  };

  render() {
    const {loading} = this.props;
    const {moreEvents, loadedEvents, loadingInitial} = this.state;
    if (loadingInitial) return <LoadingComponent inverted={true}/>;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList loading={loading}
                     moreEvents={moreEvents}
                     getNextEvents={this.getNextEvents}
                     events={loadedEvents}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading}/>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateoProps = (state) => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventsForDashboard
};

export default connect(mapStateoProps, actions)(
  firestoreConnect([{collection: 'events'}])(EventDashboard)
);