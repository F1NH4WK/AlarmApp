import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fefefe',
      alignItems: 'center',
    },
  
    textHeader: {
      fontSize: 40,
      color: '#8942fb',
    },
  
    soundGrouper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      padding: 20,
    },
  
    noSelect: {
      color: 'white',
    },
  
    select: {
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

export default styles;