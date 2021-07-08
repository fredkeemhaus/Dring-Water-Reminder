import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, Image, Dimensions } from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import asset from '../../assets/config/asset';

let {height, width} = Dimensions.get('window');

export default class GettingStarted extends React.Component {

 
    constructor(props){
      super(props);
      this.state = {
        activeIndex:0,
        carouselItems: [
        {
          background: asset.gettingStartedImage_01,
        },
        {
          background: asset.gettingStartedImage_01,
        },
        {
          background: asset.gettingStartedImage_01,
        },
        {
          background: asset.gettingStartedImage_01,
        },
        {
          background: asset.gettingStartedImage_01,
        },
      ]
    }
  }

    _renderItem({item,index}){
      return (
        <View>
          <Image style={{width: '100%', height: '100%'}} resizeMode={'contain'} source={item.background} />
        </View>

      )
    }

    get pagination() {
      const {activeIndex, carouselItems} = this.state;
  
      return (
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 10,
            // marginHorizontal: 1,
            // backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backgroundColor: 'black',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      );
    }

    render() {
      return (
        <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.state.carouselItems}
              sliderWidth={width}
              itemWidth={width}
              renderItem={this._renderItem}
              autoplay
              autoplayDelay={1000}
              autoplayInterval={5000}
              onSnapToItem = { index => this.setState({activeIndex:index}) } />

              {this.pagination}
          </View>
        </SafeAreaView>
      );
    }
}
