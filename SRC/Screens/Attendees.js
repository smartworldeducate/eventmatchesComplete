import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import MainHeader from '../Components/Headers/MainHeader';
import {speakerHandler} from '../features/speaker/speakerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from '../Components/Search';
import Icon from 'react-native-fontawesome-pro';
import {BottomSheet} from '@rneui/themed';
import colors from '../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
const Attendees = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const speakerData = useSelector(state => state.speakerState);
  // const urlData = speakerData?.user?.response?.events[0];
  console.log('speakerd data===', speakerData?.user?.response?.events);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        dispatch(
          speakerHandler({
            user_id: parsedData.user_id,
            event_id: parsedData.event_id,
            type_id: 1,
          }),
        );
        console.log('here is feedback screen data', parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  useEffect(() => {
    getData('userSession');
  }, []);

  const filteredData = speakerData?.user?.response?.events?.filter(item =>
    item.speaker_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Profile', {item})}
        style={{
          flex: 0.4,
          flexDirection: 'row',
          // backgroundColor: 'green',
          height: hp(10.3),
          borderRadius: hp(1),
          borderWidth: 0.5,
          borderColor: '#cdcdcd',
          marginVertical: hp(1.3),
          marginHorizontal: hp(2.5),
        }}>
        <View
          style={{
            flex: 0.29,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: hp(-1),
            // backgroundColor:'red',
            paddingVertical: hp(1),
            // borderRadius:hp(50),
            // borderWidth:1,
            // borderColor:'#cdcdcd',
            // margin:hp(1)
          }}>
          <View
            style={{
              borderRadius: hp(50),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              width: wp(15),
              height: hp(7.5),
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                paddingTop: hp(0),
                borderRadius: hp(50),
              }}
              source={{uri: item?.image_name}}
              resizeMode="cover"
            />
          </View>
        </View>
        <View
          style={{flex: 0.7, justifyContent: 'center', paddingLeft: hp(0.5)}}>
          <Text
            style={{
              color: colors.blackColor,
              paddingLeft: hp(0),
              fontSize: hp(1.9),
              fontWeight: '500',
              fontFamily: fontFamily.robotoMedium,
            }}>
            {item?.speaker_name}
          </Text>
          <Text
            style={{
              color: colors.grayDescColor,
              fontSize: hp(1.7),
              paddingLeft: hp(0),
              fontWeight: '300',
              fontFamily: fontFamily.robotoLight,
              paddingTop:hp(1)
            }}>
            {item?.designation}
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: hp(1),
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2CC2E4',
              paddingHorizontal: hp(1.2),
              paddingVertical: hp(0.5),
              borderRadius: hp(1),
            }}>
            <Icon type="light" name="arrow-right" size={hp(3)} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <BottomSheet
        style={{height: hp(100), backgroundColor: '#FFFFFF'}}
        isVisible={isVisible}>
        <View style={{flex: 0.2, height: hp(10), flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2.5),
                fontWeight: '600',
                fontFamily: fontFamily.robotoMedium,
              }}>
              Search
            </Text>
          </View>
          <View style={{flex: 0.55}}></View>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="xmark" size={hp(3.5)} color="red" />
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.2, marginHorizontal: hp(2.5)}}>
          <View style={{marginBottom: hp(1)}}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2),
                fontWeight: '300',
                fontFamily: fontFamily.robotoMedium,
              }}>
              State
            </Text>
          </View>
          <View
            style={{
              height: hp(6),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="light"
                name="magnifying-glass"
                size={hp(3.5)}
                color="#cdcdcd"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <TextInput
                style={{color: '#000', fontSize: hp(1.6), fontWeight: '600'}}
                placeholder={''}
                value={data}
                placeholderTextColor={'#cdcdcd'}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}></TextInput>
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
        </View>
        <View
          style={{flex: 0.2, marginHorizontal: hp(2.5), marginTop: hp(3.5)}}>
          <View style={{marginBottom: hp(1)}}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2),
                fontWeight: '300',
                fontFamily: fontFamily.robotoMedium,
              }}>
              Keywords
            </Text>
          </View>
          <View
            style={{
              height: hp(6),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="light"
                name="magnifying-glass"
                size={hp(3.5)}
                color="#cdcdcd"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <TextInput
                style={{color: '#000', fontSize: hp(1.6), fontWeight: '600'}}
                placeholder={''}
                value={data}
                placeholderTextColor={'#cdcdcd'}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}></TextInput>
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
        </View>
        <View
          style={{flex: 0.2, marginHorizontal: hp(2.5), marginTop: hp(3.5)}}>
          <View style={{marginBottom: hp(1)}}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2),
                fontWeight: '300',
                fontFamily: fontFamily.robotoMedium,
              }}>
              Industry
            </Text>
          </View>
          <View
            style={{
              height: hp(6),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="light"
                name="magnifying-glass"
                size={hp(3.5)}
                color="#cdcdcd"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <TextInput
                style={{color: '#000', fontSize: hp(1.6), fontWeight: '600'}}
                placeholder={''}
                value={data}
                placeholderTextColor={'#cdcdcd'}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}></TextInput>
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
        </View>
        <View
          style={{flex: 0.2, marginHorizontal: hp(2.5), marginTop: hp(3.5)}}>
          <View style={{marginBottom: hp(1)}}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2),
                fontWeight: '300',
                fontFamily: fontFamily.robotoMedium,
              }}>
              NAICS
            </Text>
          </View>
          <View
            style={{
              height: hp(6),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="light"
                name="magnifying-glass"
                size={hp(3.5)}
                color="#cdcdcd"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <TextInput
                style={{color: '#000', fontSize: hp(1.6), fontWeight: '600'}}
                placeholder={''}
                value={data}
                placeholderTextColor={'#cdcdcd'}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}></TextInput>
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
        </View>
        <View
          style={{flex: 0.2, marginHorizontal: hp(2.5), marginTop: hp(3.5)}}>
          <View style={{marginBottom: hp(1)}}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2),
                fontWeight: '300',
                fontFamily: fontFamily.robotoMedium,
              }}>
              SIC
            </Text>
          </View>
          <View
            style={{
              height: hp(6),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="light"
                name="magnifying-glass"
                size={hp(3.5)}
                color="#cdcdcd"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <TextInput
                style={{color: '#000', fontSize: hp(1.6), fontWeight: '600'}}
                placeholder={''}
                value={data}
                placeholderTextColor={'#cdcdcd'}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}></TextInput>
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
        </View>

        <View style={{flex: 0.4, height: hp(26), marginHorizontal: hp(2.5)}}>
          <View style={{flex: 0.5}}></View>
          <View
            style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                flex: 0.45,
                borderRadius: hp(0.5),
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#cdcdcd',
              }}>
              <Text
                style={{
                  color: colors.blackColor,
                  fontSize: hp(2.5),
                  fontWeight: '300',
                  fontFamily: fontFamily.robotoLight,
                }}>
                RESET
              </Text>
            </TouchableOpacity>

            <View
              style={{flex: 0.05, borderRadius: hp(1), height: hp(8)}}></View>

            <TouchableOpacity
              style={{
                flex: 0.499,
                borderRadius: hp(0.5),
                height: hp(8),
                backgroundColor: '#2CC2E4',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#cdcdcd',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: hp(2.5),
                  fontWeight: '300',
                  fontFamily: fontFamily.robotoLight,
                }}>
                SEARCH
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      <Modal
        visible={speakerData?.isLoading}
        transparent={true}
        animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: wp(25),
              height: hp(12.5),
              backgroundColor: 'white',
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#cdcdcd" />
          </View>
        </View>
      </Modal>
      <View style={{flex: 0.1, marginTop: hp(2.5)}}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.headerChild}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{flex: 0.15}}>
            <Icon type="solid" name="arrow-left" size={hp(3)} color="#2CC2E4" />
          </TouchableOpacity>
          <View style={{flex: 0.4, marginTop: hp(-0.5)}}>
            <Text style={styles.textstyle}>Attendees</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={{
              marginTop: hp(-1),
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                flex: 0.55,
                backgroundColor: '#2CC2E4',
                height: hp(5),
                borderRadius: hp(8),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0.37,
                  height: hp(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: hp(50),
                  marginLeft: hp(1),
                }}>
                <Icon
                  type="solid"
                  name="bars-filter"
                  size={hp(3)}
                  color="#2CC2E4"
                />
              </View>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>Filter</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{flex: 0.03}}></View> */}
      <View style={{flex: 0.1, marginTop: hp(3.5)}}>
        <Search setSearchQuery={setSearchQuery} />
      </View>

      {/* <View style={{flex: 0.8}}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgone'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgtwo'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgthree'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                  
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgfore'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                  
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgone'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                  
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgtwo'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                  
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgthree'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                  
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={{
              flex: 0.4,
              flexDirection: 'row',
              // backgroundColor: 'green',
              height: hp(10.3),
              borderRadius: hp(1),
              borderWidth: 0.5,
              borderColor: '#cdcdcd',
              marginVertical: hp(1.3),
              marginHorizontal: hp(2.5),
            }}>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: hp(-1),
                // backgroundColor:'red',
                paddingVertical: hp(1),
              }}>
              <Image
                style={{width: '70%', height: '90%', paddingTop: hp(0)}}
                source={{uri: 'imgfore'}}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2),
                  fontWeight: '600',
                  fontFamily:fontFamily.robotoBold
                  
                }}>
                TechExplorer
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  fontSize: hp(2),
                  paddingLeft: hp(0),
                  fontWeight: '300',
                  fontFamily:fontFamily.robotoLight
                }}>
                Chief Executive's, Owner
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: hp(1),
                // backgroundColor:'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2CC2E4',
                  paddingHorizontal: hp(1.2),
                  paddingVertical: hp(0.5),
                  borderRadius: hp(1),
                }}>
                <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View> */}

      <View style={{flex: 0.8}}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Attendees;

const styles = EStyleSheet.create({
  headerChild: {
    marginTop: hp(6),
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginHorizontal: hp(2.5),
  },
  textstyle: {
    color: colors.blackColor,
    marginTop: hp(0),
    fontSize: hp(2.5),
    fontWeight: '600',
    fontFamily: fontFamily.robotoBold,
    fontStyle: 'normal',
  },
});
