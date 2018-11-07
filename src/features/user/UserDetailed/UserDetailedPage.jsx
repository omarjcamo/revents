import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect, isEmpty} from 'react-redux-firebase';
import {Link} from 'react-router-dom'
import format from 'date-fns/format'
import LazyLoad from 'react-lazyload';
import differenceInYears from 'date-fns/difference_in_years';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import {userDetailedQuery} from "../userQueries";
import LoadingComponent from '../../../app/layout/LoadingComponent'

class UserDetailedPage extends Component {

  render() {
    const {user, photos, auth, match, requesting} = this.props;
    const iscurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if(loading){
      return <LoadingComponent inverted={true}/>;
    }

    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image avatar size='small' src={user.photoURL ? user.photoURL : '/assets/user.png'}/>
                <Item.Content verticalAlign='bottom'>
                  <Header as='h1'>{user.displayName}</Header>
                  {user.occupation &&
                  <br/>
                  }
                  {user.occupation &&
                  <Header as='h3'>{user.occupation}</Header>
                  }
                  <br/>
                  <Header as='h3'>
                    {
                      user.dateOfBirth ? differenceInYears(Date.now(), user.dateOfBirth.toDate()) : 'unknown age'
                    }, Lives in {' '}
                    {user.city ? user.city : 'unknown'}</Header>
                </Item.Content>
              </Item>
            </Item.Group>

          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon='smile' content={`About ${user.displayName}`}/>
                <p>I am a: <strong>{user.occupation || 'tbn'}</strong></p>
                <p>Originally from <strong>{user.city || 'tbn'}</strong></p>
                <p>Member Since: <strong>{user.createdAt && format(user.createdAt.toDate(), 'D MMM YYYY')}</strong></p>

                {user.about && <p>{user.about}</p>}

              </Grid.Column>
              <Grid.Column width={6}>

                <Header icon='heart outline' content='Interests'/>
                {user.interests ?
                  <List>
                    {
                      user.interests && user.interests.length &&
                      user.interests.map((interest, index) => (
                        <Item key={index}>
                          <Icon name='heart'/>
                          <Item.Content>{interest.charAt(0).toUpperCase() + interest.slice(1)}</Item.Content>
                        </Item>
                      ))
                    }
                  </List> : <p>No interests</p>}
              </Grid.Column>
            </Grid>

          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            {iscurrentUser ?
              <Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/> :
              <Button color='teal' fluid basic content='Follow User'/>}
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon='image' content='Photos'/>
            <Image.Group size='small'>
              {
                photos && photos.map(photo => (
                    <LazyLoad key={photo.id}
                              height={150}
                              placeholder={<Image src={'/assets/user.png'}/>}>
                      <Image src={photo.url}/>
                    </LazyLoad>
                  )
                )
              }
            </Image.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon='calendar' content='Events'/>
            <Menu secondary pointing>
              <Menu.Item name='All Events' active/>
              <Menu.Item name='Past Events'/>
              <Menu.Item name='Future Events'/>
              <Menu.Item name='Events Hosted'/>
            </Menu>

            <Card.Group itemsPerRow={5}>

              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Event Title
                  </Card.Header>
                  <Card.Meta textAlign='center'>
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Event Title
                  </Card.Header>
                  <Card.Meta textAlign='center'>
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>

    );
  }
}

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0]
    userUid = ownProps.match.params.id;
  }

  return {
    user: profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
};

const actions = {};


export default compose(
  connect(mapState, actions),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);