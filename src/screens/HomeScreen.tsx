import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { FC } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from 'react-native-size-matters';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen:FC<Props> = ({navigation}) => {


    const navigateToAddNewTimmer = () => {
        navigation.navigate('AddTimer');
    }


  return (
    <SafeAreaView style={styles.container}>
     
        <TouchableOpacity style={styles.timerButtonContainer} onPress={navigateToAddNewTimmer}>
          <Icon name="plus" size={scale(18)} color="#fff" />
          <Text style={styles.timerText}> New Timer</Text>
        </TouchableOpacity>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container:{flex: 1, backgroundColor: '#ffffdd'},
  timerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#016a70',
    padding: scale(12),
    margin: scale(16),
    width: '90%',
    borderRadius: scale(32),
    position: 'absolute',
    bottom: 0,
  },
  timerText: {
    fontWeight: '900',
    fontSize: scale(18),
     color: '#fff'
    },
});

export default HomeScreen;
