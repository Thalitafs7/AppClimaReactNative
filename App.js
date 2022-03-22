import React from 'react';
import
{ ActivityIndicator,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import SearchInput from './components/SearchInput'
import getImage from './utils/ImagesForWeather'
import {fetchLocationId, fetchWeather} from './utils/api'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loading: false,
      error: false,
      location: "",
      temperature: 0,
      weather: "",
    };
  }

  componentDidMount(){
    this.handleUpdateLocation('San Francisco');
  }

  handleUpdateLocation = async city =>{
    if(!city) return;

    this.setState({loading: true}, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const {location, weather, temperature} = await fetchWeather(locationId);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
        
      } catch (e) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  }

  renderContent(){
    const {error} = this.state;

    return(
      <View>
        {error &&(
            <Text style={[styles.smallText, styles.textStyle]}>
              Could not load weather, please try a different city.
            </Text>
          )}
        {!error && this.renderInfo() }
        
        <SearchInput 
        placeholder="Search any city"
        onSubmit={this.handleUpdateLocation}/>
      </View>
    )
  }

  renderInfo(){
    const {location, weather, temperature} = this.state;
    return (
      <View>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>
        {`${Math.round(temperature)}°`}
        </Text>
      </View>
    );
  }

 render(){
  const {weather, loading} = this.state;

   return (
     <View style={styles.container}>
      <ImageBackground 
        source={getImage(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}>

      <View style={styles.detailsContainer}>
        <ActivityIndicator animating={loading} color="white" size="large"/>
        {!loading && this.renderContent()}
      </View>

      </ImageBackground>
      <StatusBar style="auto"/>
     </View>
   );
 }
}

//#region STYLES
const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  imageContainer:{
    flex: 1, // se adequa ao container pai 
  },
  image:{
    flex: 1,
    width: null, //se ajusta ao container no qual ela esta inserido 
    height: null, //se ajusta ao container
    resizeMode: 'cover' //redimenciona a imagem até que seja igual ao tamanho do componente
  },
  detailsContainer:{
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  textStyle:{
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: "white"
  },
  largeText:{
    fontSize: 44
  },
  smallText:{
    fontSize:18
  }
});
//#endregion
