import React, {Component} from 'react';
import {ScrollView,TextInput, ImageBackground, Button, Text, Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import Communications from 'react-native-communications';
import { createStackNavigator, createAppContainer } from "react-navigation";
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  _llamarSegur(){
    Communications.phonecall('1402', false);
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
    Communications.phonecall('133', false);
  }
  render() {
    return (
      
      <ImageBackground source={require('./assets/backg.png')} style={styles.bkg}>
        <ScrollView>
          <View style={styles.container}>

              <TouchableOpacity style={styles.botones} onPress={this._llamarSegur}>
                <Image source={require('./assets/ciuda.png')} style={styles.imagenes}/>
              </TouchableOpacity>

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

              <TouchableOpacity style={styles.botones} onPress={() => this.props.navigation.navigate('Details')}>
                <Image source={require('./assets/chat.png')} style={styles.imagenes}/>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
  };

  constructor(){
    super();
    this.state = { text: '', mensajes:[] };
   
  }
  render() {
    var socket = io('http://localhost:3000',{jsonp:false}), mensajes = [];

    socket.on("recibir",(mensaje)=>{
      this.state.mensajes.push(mensaje);
      this.forceUpdate();
    });
    const {mensajes} = this.state.mensajes
    return (
          <View>
             <ScrollView>
               {this.state.mensajes.map(info => <Text style={{padding: 10, fontSize: 12}}>{info}</Text>)}
             </ScrollView>
             <View style={styles.enviar}>
              <TextInput placeholder="Escribe tu mensaje..." onChangeText={(text) => this.setState({text})}/>
                <Button title="Enviar" onPress={()=>{socket.emit("send",this.state.text)}}/>
              </View>
					</View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
    headerMode:'float',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1E496B',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
        // backgroundColor:'red',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-evenly',
  },
  enviar:{
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    marginTop: '4%',
  },
  imagenes:{
    marginTop:2.5,
    width: 200, 
    height: 90,
    resizeMode:'contain'
  }
});