import React from 'react'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import {Switch, Route, Redirect} from 'react-router-dom'
import SettingsNav from "./SettingsNav";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import {updatePassword} from "../../auth/authActions";
import {updateProfile} from "../userActions";

const SettingsDashboard = ({updatePassword, updateProfile, providerId, user}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basic'/>
          <Route path='/settings/basic'
                 render={() =>
                   <BasicPage
                     updateProfile={updateProfile}
                     initialValues={user}/>}/>
          <Route path='/settings/about' render={() => <AboutPage
            updateProfile={updateProfile}
            initialValues={user}/>}/>
          <Route path='/settings/photos' component={PhotosPage}/>
          <Route path='/settings/account'
                 render={() =>
                   <AccountPage updatePassword={updatePassword}
                                providerId={providerId}/>}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <h1>Nav</h1>
        <SettingsNav/>
      </Grid.Column>
    </Grid>
  );
};

const actions = {
  updatePassword,
  updateProfile
};

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});


export default connect(mapState, actions)(SettingsDashboard);