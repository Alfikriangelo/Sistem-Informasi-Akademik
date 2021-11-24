import {conforms} from 'lodash';
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeMahasiswa = ({navigation}) => {
  const [kehadiran, setKehadiran] = useState([]);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState([]);
  const scrollA = useRef(new Animated.Value(0)).current;

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemNama = item.nama ? item.nama.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemNama.indexOf(textData) > -1;
      });
      setKehadiran(newData);
      setSearch(text);
    } else {
      setKehadiran(masterData);
      setSearch(text);
    }
  };

  const getKehadiranMahasiswa = () => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/mahasiswa';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setKehadiran(responseJson);
        setMasterData(responseJson);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchImage = () => {
    const apiURL =
      'https://project-fadhil-heroku.herokuapp.com/app/uploads/gambar/';

    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setPhoto(resJson);
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);
  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      getKehadiranMahasiswa();
    });
    return unSubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}>
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={require('../../assets/DataMahasiswa.jpg')}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.searchSection}>
            <Ionicons
              style={styles.searchIcon}
              name="search-outline"
              size={20}
              color="#000"
            />
            <TextInput
              value={search}
              style={styles.input}
              placeholder="Search..."
              placeholderTextColor="grey"
              onChangeText={text => searchFilter(text)}
              underlineColorAndroid="transparent"
            />
          </View>
          {isLoading ? (
            <ActivityIndicator marginTop={20} color={'#31539A'} />
          ) : (
            <View style={{marginVertical: 10}}>
              {kehadiran.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.list}
                  onPress={() =>
                    navigation.navigate('Detail Mahasiswa', {
                      item: item,
                    })
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: 150}}>
                      <Image
                        source={{
                          uri: `https://project-fadhil-heroku.herokuapp.com/app/uploads/gambar/${item.foto}`,
                        }}
                        style={{width: '100%', height: 170, borderRadius: 20}}
                      />
                    </View>

                    <View style={{marginLeft: 10}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={2}
                          style={{
                            fontFamily: 'SourceSansPro-Regular',
                            color: '#f3f3f3',
                            fontWeight: 'bold',
                            fontSize: 20,
                            width: 150,
                          }}>
                          {item.nama}
                        </Text>
                        <View>
                          <Text
                            style={{
                              fontFamily: 'SourceSansPro-Regular',
                              color: '#f3f3f3',
                              fontSize: 20,
                              marginRight: 15,
                            }}>
                            {item.nim}
                          </Text>
                        </View>
                      </View>
                      {item.id_kelas.map((v, i) => (
                        <Text
                          key={i}
                          style={{
                            color: '#f3f3f3',
                            fontSize: 15,
                            fontFamily: 'SourceSansPro-Regular',
                          }}>
                          {v.kelas}
                        </Text>
                      ))}
                      {item.id_programStudi.map((v, i) => (
                        <Text
                          key={i}
                          style={{
                            color: '#f3f3f3',
                            fontSize: 15,
                            fontFamily: 'SourceSansPro-Regular',
                          }}>
                          {v.nama_prodi}
                        </Text>
                      ))}

                      <Text
                        style={{
                          color: '#f3f3f3',
                          fontSize: 15,
                          fontFamily: 'SourceSansPro-Regular',
                        }}>
                        {item.email}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: 180,
    width: '100%',
    transform: [
      {
        translateY: scrollA,
      },
    ],
  }),
  searchSection: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    marginTop: 10,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    height: 50,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#f3f3f3',
    color: '#424242',
    borderRadius: 10,
  },
  list: {
    backgroundColor: '#31539A',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
});

export default HomeMahasiswa;
