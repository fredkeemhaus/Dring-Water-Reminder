import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components';

const ProgressContainer = styled.View`
  width: 100%;
  margin-top: 15px;
`

const ProgressBarWrap = styled.View`
  background-color: #c4c4c4;
  height: ${props => props.customHeight ? props.customHeight : '10px'};
  border-radius: 10px;
`

const ProgressGaugeFilled = styled(Animated.View)`
  width: ${props => props.filled}%;
  background-color: ${props => props.barColor};
  height: ${props => props.customHeight ? props.customHeight : '10px'};
  border-radius: 10px;
`

const PercentText = styled.Text`
  font-weight: 600;
  font-size: 12px;
  color: #979797;
  font-family: 'NanumSquareBold';
  margin-top: 5px;
`

const ProgressBar = (props) => {
  const {
    gaugeWidth,
    barColor,
    customHeight
  } = props;
  
  const percentage = (Math.floor(gaugeWidth * 1000) / 1000).toFixed(1);

  const fadeAnim = useRef(new Animated.Value(0)).current 

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: gaugeWidth,
        duration: 1000,
      }
    ).start();
  }, [fadeAnim])

  console.log(fadeAnim)
  
  return (
    <ProgressContainer>
      <ProgressBarWrap customHeight={customHeight}>
        <ProgressGaugeFilled 
          // style={{ width: fadeAnim }}
          filled={gaugeWidth} barColor={barColor} customHeight={customHeight} 
        />
      </ProgressBarWrap>
      <View style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
        <PercentText>{percentage}%</PercentText>
      </View>
    </ProgressContainer>
  )
}

export default ProgressBar