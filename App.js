import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';

export default function App() {

  // STATES 
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [time, setTime] = useState(new Date());
  const [audios, setAudio] = useState([
    {tipo: 'volume-low', selected: false, 
    file: require('./assets/Ronin.m4a')},

    {tipo: 'volume-medium', selected: false,
    file: require('./assets/oah.m4a')},

    {tipo: 'volume-high', selected: false,
    file: require('./assets/roblox.m4a')}
  ]);
  const [play, setPlay] = useState(false)

  // Here, useEffect is while the play button is true, otherwise it won't do anything.
  // while play is true the counting will be descending until both minutes and seconds are 0.
  // when both get 0, the play's set to false, then the useEffect won't do anything again.

  useEffect(()=> {
    if (play){
    const timer = setInterval(() => {
      
      if (minutes > 0){
        setSeconds(seconds-1)
        seconds == 0?
        [setMinutes(minutes -1), setSeconds(59)] : null
      }

      else{
        seconds > 0?
        setSeconds(seconds-1) : [setPlay(false), playSound()]
      }
    }, 1000)

    return(() => clearInterval(timer))
  }
  })

  // FUNCTION TO PLAY THE ALARM SOUND

  async function playSound(){
    const sound = new Audio.Sound();
    let file = "";
    try{
      audios.map(val => val.selected? file = val.file: null)
      await sound.loadAsync(file)
      await sound.playAsync();
    }
    catch(er){
      alert(er)
    }
}

  // TIME PICKER CONFIG
  const onChange = (event, selectedDate) => {
    setTime(selectedDate);
    setSeconds(time.getMinutes())
    setMinutes(time.getHours());
  };

  const showTime = () => DateTimePickerAndroid.open({
      value: time,
      mode: 'time',
      is24Hour: true,
      display: 'spinner',
      onChange,
    });

  // CREATING A VAR TO ADD A '0' IN SOME SITUATIONS WHERE SECONDS ARE LOWER THAN 10
  let secondsCheck = seconds < 10? 
  '0' + seconds: seconds;

  // I'm using a dateTime system and it only has hours and minutes. To make the app
  // simple, i'm using hours as minutes and minutes as seconds.

  function Sons(props){
    return(
    <Pressable onPress={() => changeAudio(props.index)}>
      <Ionicons name={props.nome} size={40} 
      style = {[styles.teste, props.select? styles.testeOn: null]} />
    </Pressable>
    )
  }

  // Set all audios to false and then set true the selected one.
  const changeAudio = (i) => {
    audios.map((val) => val.selected = false)
    audios[i].selected = true;
    setAudio(audios)
  }

  // --------------------

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      
      <Text style = {styles.textHeader}>TIMER</Text>
      <View style = {styles.compoGroup}>

      <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 40,}}>
        {minutes + ':' + secondsCheck}
      </Text>

      <View style = {styles.soundGrouper}>

        {audios.map((i, index) => <Sons nome = {i.tipo} select = {i.selected}
        index = {index}></Sons>)}

      </View>

      <Pressable onPress={() => play? setPlay(false) : setPlay(true)}>
      { play?
      (<Ionicons name="ios-pause-circle-outline" size={55} color="#8942fb" />)
      :
      <Ionicons name="play-circle-outline" size={55} color="#8942fb" />
      }
      </Pressable>

      </View>
        <Pressable onPress={showTime} style = {styles.alarmStyle}>
          <Ionicons name='timer' size = {55} 
          color = '#8942fb'/>
        </Pressable>

    </View>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    
  },

  textHeader: {
    fontSize: 40,
    color: '#8942fb',
    fontWeight: '900',
    // marginBottom: 10
  },

  soundGrouper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 20,
    // borderColor: 'red',
    // borderWidth: 2,
  },

  teste: {
    color: 'white',
  },

  testeOn: {
    color: 'violet'
  },

  alarmStyle: {
    position: 'absolute',
    padding: 20,
    right: 0,
    bottom: 0,
  },

  compoGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
