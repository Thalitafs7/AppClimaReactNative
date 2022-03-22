const images = {   
    'Clear': require('../assets/imgWeather/clear.png'),  
    'Hail': require('../assets/imgWeather/hail.png'),   
    'Heavy Cloud': require('../assets/imgWeather/heavy-cloud.png'),  
    'Light Cloud': require('../assets/imgWeather/light-cloud.png'),  
    'Heavy Rain': require('../assets/imgWeather/heavy-rain.png'), 
    'Light Rain': require('../assets/imgWeather/light-rain.png'), 
    'Showers': require('../assets/imgWeather/showers.png'),  
    'Sleet': require('../assets/imgWeather/sleet.png'), 
    'Snow': require('../assets/imgWeather/snow.png'),   
    'Thunder': require('../assets/imgWeather/thunder.png')
 };

export default function getImage(weather){
    return images[weather];
}