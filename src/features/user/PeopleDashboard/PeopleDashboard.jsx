import React, {Component} from 'react';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import PersonCard from './PersonCard';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {firestoreConnect} from "react-redux-firebase";
import {peopleDashboardQuery} from "../userQueries";


class PeopleDashboard extends Component {
  render() {
    const {following, followers} = this.props;
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Header dividing content="People following me" />
            <Card.Group itemsPerRow={8} stackable>
              {
                followers && followers.map(follower => (
                  <PersonCard key={follower.id} user={follower}/>
                ))
              }
            </Card.Group>
          </Segment>
          <Segment>
            <Header dividing content="People I'm following" />
            <Card.Group itemsPerRow={8} stackable>
              {
                following && following.map(followingUser => (
                  <PersonCard key={followingUser.id} user={followingUser}/>
                ))
              }
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = (state) => {
  return {
    userUid: state.firebase.auth.uid,
    followers: state.firestore.ordered.followers,
    following: state.firestore.ordered.following
  }
};

export default compose(
  connect(mapState),
  firestoreConnect((userUid) => peopleDashboardQuery(userUid))
)(PeopleDashboard);