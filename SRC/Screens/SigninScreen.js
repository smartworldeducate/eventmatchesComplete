import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ficon from 'react-native-fontawesome-pro';
import React, { useState } from 'react'
import ViewInput from '../Components/Headers/ViewInput';
import fontFamily from '../Styles/fontFamily';

const SigninScreen = (props) => {
  const [email,setEmail]=useState(null)

  return (
    <View
      style={{
        flex: 1,

      }}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.2, marginTop: hp(-3) }}>
          <Image
            source={{ uri: 'vectortop' }}
            style={{ width: '100%', height: '100%' }}
            resizeMode={'contain'} />
        </View>
        <View style={{ flex: 0.5, marginTop: hp(8) }}>
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', marginTop: hp(-6) }}>
            <Image
              source={{ uri: 'eventmaches' }}
              style={{ width: wp(46), height: hp(23) }}
              resizeMode={'contain'} />
          </View>

         <View style={{flex:0.2,marginTop:hp(8)}}>
         <ViewInput name={'Email Address'} value={email}/>
         </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:hp(3.5)}}>
          <View></View>
          <View style={{flexDirection:'row',justifyContent:'space-between',justifyContent:'center',alignItems:'center'}}>
            <View style=
            {{paddingRight:10}}>
            <Text style={{color:'#2C3A4B',fontSize:hp(2.5),fontWeight:'600',fontFamily:fontFamily.robotoBold}}>Continue</Text>
            </View>
            <TouchableOpacity onPress={()=> props.navigation.navigate("SigninPassword")} style={{width:wp(13.5),height:hp(4.5),backgroundColor:'#D0D0D0',borderRadius:hp(1.5),justifyContent:'center',alignItems:'center'}}>
            <Ficon type="light" name="arrow-right" color="#FFFFFF" size={25} />
              </TouchableOpacity>
           
          </View>
        </View>
        <View style={{ flex: 0.3, marginLeft: hp(-25.5), marginTop: hp(4) }}>
          <Image
            source={{ uri: 'vectorbottom' }}
            style={{ height: hp(32) }}
            resizeMode={'contain'} />
        </View>
      </View>
    </View>
  )
}

export default SigninScreen