import React, {Component} from 'react';
import {ImageBackground,Image, TouchableOpacity, Button, Linking, Alert, Platform, StyleSheet, Text, View} from 'react-native';
import Communications from 'react-native-communications';

const args = {
  number: '123456', // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
}



export default class ButtonBasics extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  _llamarAmbulancia(){
    Communications.phonecall('131', false);
  }
  _llamarBombero(){
    Communications.phonecall('132', false);
  }
  _llamarPolicia(){
    Communications.phonecall('134', false);
  }
  _llamarCarabinero(){
    // RNImmediatePhoneCall.immediatePhoneCall('0123456789');
    Communications.phonecall('133', false);
  }
  render() {
    return (

      <ImageBackground source={require('./assets/backg.png')} style={styles.bkg}>
              <View style={styles.container}>
                  <TouchableOpacity style={styles.botones} onPress={this._llamarAmbulancia}>
                    <Image source={require('./assets/ambu.jpg')} style={styles.imagenes}/>
                  </TouchableOpacity>

                 <TouchableOpacity style={styles.botones} onPress={this._llamarBombero}>
                    <Image source={require('./assets/bomb.png')} style={styles.imagenes}/>
                  </TouchableOpacity>


                  <TouchableOpacity style={styles.botones} onPress={this._llamarCarabinero}>
                    <Image source={require('./assets/carab.png')} style={styles.imagenes}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botones} onPress={this._llamarPolicia}>
                    <Image source={require('./assets/pdi.png')} style={styles.imagenes}/>
                  </TouchableOpacity>
                  </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        // backgroundColor:'red',
        marginTop: '15%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-evenly',
  },
  bkg:{
    width: '100%', height: '100%',
  },
  botones:{
    borderRadius: 20,
    borderWidth:2,
    borderColor:'white',
    width:200,
    height:100,
    backgroundColor:'#01a699',
    flexWrap: 'wrap',
    marginTop: 40,
    zIndex:10
  },
  imagenes:{
    marginTop:2.5,
    width: 200, 
    height: 90,
    resizeMode:'contain'
  }
});