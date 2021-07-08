import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

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
  } = props;
  return (
    <HeaderComponent>
      <View>
        <Text>1</Text>
      </View>
      <View>
        <HeaderTitle>{title}</HeaderTitle>
      </View>
      <View>
        <Text>1</Text>
      </View>
    </HeaderComponent>
  )
}

export default BaseHeader;