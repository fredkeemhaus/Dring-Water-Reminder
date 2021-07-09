import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Entypo } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

const HeaderComponent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  border-bottom-color: #e0e0e0;
  border-bottom-width: 1px;
`

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  font-family: 'NanumSquareBold';
`

const BaseHeader = (props) => {
  const {
    title,
    closed
  } = props;
  
  return (
    <HeaderComponent>
      <View>
        {closed && (
          <TouchableOpacity style={{height: '100%', display: 'flex', justifyContent: 'center', flex: 1}} onPress={() => Actions.pop()}>
            <Entypo name="chevron-small-left" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <HeaderTitle>{title}</HeaderTitle>
      </View>
      <View>
        <Entypo name="chevron-small-left" size={24} color="white" />
      </View>
    </HeaderComponent>
  )
}

export default BaseHeader;