import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components';

import BaseHeader from '../../Component/BaseHeader';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import ProgressBar from '../../Component/ProgressBar';

let {height, width} = Dimensions.get('window');

const SettingButton = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
`

const TextBox = styled.View`
  padding: 30px 0;
`

const BoldText = styled.Text`
  font-family: 'NanumSquareBold';
  font-size: 24px;
  line-height: 34px;
`

const RegularText = styled.Text`
  font-family: 'NanumSquareRegular';
  font-size: 18px;
`

const Home = () => {
  const [value, setValue] = useState(null);
  const [isDailyRefAmount, setDailyRefAmount] = useState(null);
  const [isAmount, setAmount] = useState(0);
  const [isCompleted, setCompleted] = useState(false);

  

  useEffect(() => {
    const loadData = async () => {
      try {
        // AsyncStorage.removeItem('AmountDrunk');
        const result = await AsyncStorage.getItem('userInfo');
        const userInfoData = JSON.parse(result);

        const amountDrunk = await AsyncStorage.getItem('AmountDrunk');
        console.log(amountDrunk,'--')
        const amountData = JSON.parse(amountDrunk);
        console.log(amountData,'--')


        if(!_.isNil(userInfoData)) {
          setValue(userInfoData.value);
          setDailyRefAmount(userInfoData.dailyRef);
        }

        if(!_.isNil(amountData)) {
          setAmount(amountData);
        }

        if(isAmount === parseInt(isDailyRefAmount)) {
          setCompleted(true);
        }

      } catch(e) {
        console.log(e);
      }
    }

    loadData();
  }, [value, isDailyRefAmount, isAmount])

  const updateProgress = async (value) => {
    const minus = parseInt(isDailyRefAmount) - isAmount;
    try {


      if(isAmount >= parseInt(isDailyRefAmount)) {
        return Alert.alert('모두 완료되었습니다.\n더 기록하고 싶으시면,\n일일 기준량을 늘려보세요.');
      }

      if(minus < value) {
        setAmount( async(prev) => {
          parseInt(prev) + parseInt(minus)
          await AsyncStorage.setItem('AmountDrunk', JSON.stringify(parseInt(prev) + parseInt(minus)));
        });  
      } else {
        setAmount( async(prev) => {
          parseInt(prev) + parseInt(value)
          await AsyncStorage.setItem('AmountDrunk', JSON.stringify(parseInt(prev) + parseInt(value)));
        });
      }
    } catch(e) {
      console.log(e)
    }
  }


  const gaugeWidth = isAmount / isDailyRefAmount * 100;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <SettingButton onPress={() => Actions.push('start')} >
          <Feather name="settings" size={24} color="#81b0ff" />
        </SettingButton>
        <View>
          <TextBox>
            {isCompleted ? (
              <>
                <BoldText>오늘 하루 목표를 달성했어요!</BoldText>
                <BoldText>내일도 목표 달성!</BoldText>
              </>
            ) : (
              <>
                <BoldText>우리 물 열심히 마셔요</BoldText>
                <BoldText>포기하지 마요!</BoldText>
              </>
            )
            }
          </TextBox>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%'}}>
            {!isCompleted ? (
              <BoldText style={{fontSize: 20, lineHeight: '34px'}}>약속했으면 지킵시다!</BoldText>
            ) : (
              <BoldText style={{fontSize: 20, lineHeight: '34px'}}>해낼 줄 알았어요!</BoldText>
            )}
            {!isCompleted ? (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <BoldText style={{fontSize: 20, lineHeight: '34px'}}>마시기로한&nbsp;&nbsp;</BoldText>
                <BoldText style={{fontSize: 34}}>{isDailyRefAmount * 0.001}L</BoldText>
              </View>
            ) : (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <BoldText style={{fontSize: 20, lineHeight: '34px'}}>마시니까 별거 아니죠?&nbsp;&nbsp;</BoldText>
                <BoldText style={{fontSize: 34}}>{isDailyRefAmount * 0.001}L</BoldText>
              </View>
            )}
            <ProgressBar gaugeWidth={gaugeWidth} barColor={"#81b0ff"} />
            {!isCompleted && (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <BoldText>{isDailyRefAmount - isAmount}ml&nbsp;&nbsp;</BoldText>
                <BoldText>남았어요!</BoldText>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={() => updateProgress(value)} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: '#81b0ff', borderRadius: 8}}>
          {!isCompleted ? (
            <BoldText style={{color: '#f5dd4b'}}>마셨다!</BoldText>
          ) : (
            <BoldText style={{color: '#f5dd4b'}}>다 마셨다!</BoldText>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home;