import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'column',
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}>
          <View style={styles.matkul}>
            <TouchableOpacity onPress={() => navigation.push('Get Matkul')}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    width: 157,
                    height: 137,
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    borderRadius: 20,
                  }}
                  source={require('../../assets/KodeMatkul.jpg')}
                />
                <Text style={styles.text2}>Matkul</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ruangan}>
          <TouchableOpacity onPress={() => navigation.push('Get')}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 157,
                  height: 137,
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  borderRadius: 20,
                }}
                source={require('../../assets/Ruangan.jpg')}
              />
              <Text style={styles.text3}>Ruangan</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.kelas}>
          <TouchableOpacity onPress={() => navigation.push('GetKelas')}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 157,
                  height: 137,
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  borderRadius: 20,
                }}
                source={require('../../assets/Kelas.jpg')}
              />
              <Text style={styles.text}>Kelas</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.prodi}>
          <TouchableOpacity onPress={() => navigation.push('GetProdi')}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 157,
                  height: 137,
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  borderRadius: 20,
                }}
                source={require('../../assets/Prodi.jpg')}
              />
              <Text style={styles.text4}>Prodi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 30,
    marginLeft: '15%',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#3E3E3E',
  },
  text2: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 30,
    marginLeft: '15%',
    color: '#3E3E3E',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  text3: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 30,
    color: '#3E3E3E',
    marginLeft: '10%',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  text4: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 30,
    color: '#3E3E3E',
    marginLeft: '15%',
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  ruangan: {
    backgroundColor: '#EBE9F4',
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  kelas: {
    backgroundColor: '#B6E1FF',
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  matkul: {
    backgroundColor: '#D5F1FF',
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  prodi: {
    marginTop: 10,
    backgroundColor: '#F3F5F4',
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
export default Home;
