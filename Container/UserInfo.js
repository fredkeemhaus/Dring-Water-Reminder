import React, { useEffect, useRef, useState } from 'react';
import {View, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components';
import { Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import ReactNativePickerModule from "react-native-picker-module"


import BaseHeader from '../Component/BaseHeader';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

const Container = styled.ScrollView`
  padding: 0 20px;
`

const SpaceBetweenTouch = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  padding: 24px 0;
`

const SpaceBetweenView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
`

const BoldText = styled.Text`
  font-family: 'NanumSquareBold';
  font-size: 18px;
`

const RegularText = styled.Text`
  font-family: 'NanumSquareRegular';
  font-size: 18px;
`

const SelectContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const SelectBox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const InputContainer = styled.TextInput`
  margin-right: 10px;
  font-family: 'NanumSquareBold';
  font-size: 18px;
`


const UserInfo = () => {
  const [isUserSex, setUserSex] = useState(-1);
  const [isUserWeight, setUserWeight] = useState(null);
  const pickerRef = useRef();
  const pickerLiterRef = useRef();
  const [value, setValue] = useState(null);
  const [isDailyRefAmount, setDailyRefAmount] = useState(null);
  const [isConfirmButton, setConfirmButton] = useState(false);

  const dataset_1 = [100, 200, 300, 400, 500, 600, 700, 800, 900]
  const dataset_2 = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]

  useEffect(() => {
    const isGetUserInfo = async () => {
      try {
        const result = await AsyncStorage.getItem('userInfo');
        const userInfoData = JSON.parse(result);

        if(!_.isNil(userInfoData)) {
          setUserSex(userInfoData.sex);
          setUserWeight(userInfoData.weight);
          setValue(userInfoData.value);
          setDailyRefAmount(userInfoData.dailyRef);
        }
      } catch(e) {
        console.log(e);
      }
    }

    isGetUserInfo();
  }, [])

  useEffect(() => {
    const isComapareData = async () => {

      const result = await AsyncStorage.getItem('userInfo');
      const userInfoData = JSON.parse(result);


      try {
        if(!_.isNil(userInfoData)) {
          console.log(userInfoData,'--')
          if(!_.isEqual(userInfoData.sex, isUserSex)) {
            setConfirmButton(false);
          } else if (!_.isEqual(userInfoData.weight, isUserWeight)) {
            setConfirmButton(false);
          } else if (!_.isEqual(userInfoData.value, value)) {
            setConfirmButton(false);
          } else if (!_.isEqual(userInfoData.dailyRef, isDailyRefAmount)) {
            setConfirmButton(false);
          } else {
            setConfirmButton(true);
          }
        }
      } catch(e) {
        console.log(e)
      }
    }

    isComapareData();
  }, [isUserSex, isUserWeight, value, isDailyRefAmount])

  const isSubmitUserInfo = async () => {
    try {
      if(isConfirmButton) {
        return Alert.alert('변경된 사항이 없습니다.');
      }

      if(isUserSex === -1) {
        Alert.alert('성별을 선택해주세요.');
      } else if (_.isNil(isUserWeight)) {
        Alert.alert('몸무게를 입력해주세요.');
      } else if (_.isNil(value)) {
        Alert.alert('1회 섭취량을 설정해주세요.');
      } else {
        await AsyncStorage.setItem('userInfo', JSON.stringify({
          sex: isUserSex,
          weight: isUserWeight,
          value,
          dailyRef: _.isNil(isDailyRefAmount) ? (Math.ceil(isUserWeight * 30 * 0.01) * 0.1).toFixed(1) * 1000 : isDailyRefAmount
        }))

        Alert.alert('저장이 완료되었습니다.', () => {
          Actions.pop();
        })
        
      }
    } catch(e) {
      console.log(e);
    }
  }

  const isSelectSex = (type) => {
    setUserSex(type);
  }

  
  return (
    <SafeAreaView style={{flex: 1}}>
      <BaseHeader title={'기준량 설정'} closed />
      <Container>
        <SpaceBetweenTouch>
          <BoldText>
            유저 신체 정보
          </BoldText>
        </SpaceBetweenTouch>
        <SpaceBetweenView>
          <BoldText>
            성별
          </BoldText>
          <SelectContainer>
            <SelectBox onPress={() => isSelectSex(0)} style={{backgroundColor: isUserSex === 0 ? '#81b0ff' : '#767577', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px'}}>
              <BoldText style={{color: isUserSex === 0 ? '#f5dd4b' : "#f4f3f4"}}>남성</BoldText>
            </SelectBox>
            <SelectBox onPress={() => isSelectSex(1)} style={{backgroundColor: isUserSex === 1 ? '#81b0ff' : '#767577', borderTopRightRadius: '4px', borderBottomRightRadius: '4px'}}>
              <BoldText style={{color: isUserSex === 1 ? '#f5dd4b' : "#f4f3f4"}}>여성</BoldText>
            </SelectBox>
          </SelectContainer>
        </SpaceBetweenView>
        <SpaceBetweenView>
          <BoldText>
            체중
          </BoldText>
          <SelectContainer>
            <InputContainer
              placeholder="체중을 입력해주세요."
              keyboardType="number-pad"
              value={isUserWeight}
              onChangeText={term => {
                setUserWeight(term);
              }}
            />
            <BoldText>
              Kg
            </BoldText>
          </SelectContainer>
        </SpaceBetweenView>
        <SpaceBetweenTouch>
          <BoldText>
            섭취 정보
          </BoldText>
        </SpaceBetweenTouch>
        <SpaceBetweenView>
          <BoldText>
            1회 섭취량
          </BoldText>
          <TouchableOpacity onPress={() => pickerRef.current.show()}>
            {_.isNil(value) ? (
              <BoldText style={{color: '#81b0ff'}}>
                설정
              </BoldText>
            ) : (
              <BoldText>
                {value}ml
              </BoldText>
            )}
          </TouchableOpacity>
        </SpaceBetweenView>
        <View>
          <SpaceBetweenView>
            <BoldText>
              일일 기준량
            </BoldText>
            <SelectContainer>
              <TouchableOpacity onPress={() => pickerLiterRef.current.show()}>
                { _.isNil(isDailyRefAmount) ? (
                  <BoldText>{(Math.ceil(isUserWeight * 30 * 0.01) * 0.1).toFixed(1)}L</BoldText>
                ) : (
                  <BoldText>{(Math.ceil(isDailyRefAmount) * 0.001).toFixed(1)}L</BoldText>
                )}
              </TouchableOpacity>
            </SelectContainer>
          </SpaceBetweenView>
          <View style={{paddingHorizontal: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
            <RegularText style={{fontSize: 14, color: '#767577'}}>하루 적정 기준량은 (체중 * 30) 입니다.</RegularText>
          </View>
        </View>
      </Container>
      <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={() => isSubmitUserInfo()} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: !isConfirmButton ? '#81b0ff' : '#767577', borderRadius: 8}}>
          <BoldText style={{color: !isConfirmButton ? '#f5dd4b' : '#f4f3f4' }}>저장</BoldText>
        </TouchableOpacity>
      </View>
      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={value}
        title={"밀리리터(ml) 단위로 설정됩니다."}
        items={dataset_1}
        titleStyle={{ color: "black" }}
        itemStyle={{ color: "black" }}
        selectedColor="#FC0"
        confirmButtonEnabledTextStyle={{ color: "black" }}
        confirmButtonDisabledTextStyle={{ color: "grey" }}
        cancelButtonTextStyle={{ color: "black" }}
        onCancel={() => {
          console.log("Cancelled")
        }}
        onValueChange={value => {
          console.log("value: ", value)
          setValue(value)
        }}
      />
      <ReactNativePickerModule
        pickerRef={pickerLiterRef}
        value={value}
        title={"밀리리터(ml) 단위로 설정됩니다."}
        items={dataset_2}
        titleStyle={{ color: "black" }}
        itemStyle={{ color: "black" }}
        selectedColor="#FC0"
        confirmButtonEnabledTextStyle={{ color: "black" }}
        confirmButtonDisabledTextStyle={{ color: "grey" }}
        cancelButtonTextStyle={{ color: "black" }}
        onCancel={() => {
          console.log("Cancelled")
        }}
        onValueChange={value => {
          console.log("value: ", value)
          setDailyRefAmount(value)
        }}
      />
    </SafeAreaView>
  )
}

export default UserInfo;