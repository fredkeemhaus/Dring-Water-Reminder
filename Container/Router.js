import React from 'react';
import {View, Text} from 'react-native';
import {
  Scene,
  Router,
  Reducer,
  Overlay,
  Tabs,
  Modal,
  Stack,
  Lightbox,
  Actions,
} from 'react-native-router-flux';
import GettingStarted from './main/GettingStarted';
import Home from './main/Home';
import Start from './Start';
import UserInfo from './UserInfo';

const AppRouter = () => {
  return (
    <Router>
      <Overlay>
        <Lightbox>
          <Stack key="root" hideNavBar>
            <Scene key={'gettingStarted'} component={GettingStarted} />
            <Scene key={'start'} component={Start} />
            <Scene key={'home'} component={Home}  initial />
            <Scene key={'userInfo'} component={UserInfo} />
          </Stack>
        </Lightbox>
      </Overlay>
    </Router>
  )
}

export default AppRouter;