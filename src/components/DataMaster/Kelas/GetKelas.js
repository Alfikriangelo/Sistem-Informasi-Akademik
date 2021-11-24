import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GetKelas = ({navigation}) => {
  const [kelas, setKelas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollA = useRef(new Animated.Value(0)).current;

  const getKelas = () => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/kelas';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setKelas(responseJson);
        setMasterData(responseJson);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unSubsribe = navigation.addListener('focus', () => {
      getKelas();
    });
    return unSubsribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    getKelas();
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemKelas = item.kelas
          ? item.kelas.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemKelas.indexOf(textData) > -1;
      });
      setKelas(newData);
      setSearch(text);
    } else {
      setKelas(masterData);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}
        style={styles.container}>
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={require('../../../assets/Kelas.jpg')}
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
            <ActivityIndicator marginTop={20} color={'#3D5B90'} />
          ) : (
            <View style={{marginVertical: 10}}>
              {kelas.map((item, i) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Detail Kelas', {item: item})
                  }
                  key={i}
                  style={styles.content}>
                  <Text
                    style={{
                      color: '#F3F3F3',
                      fontSize: 24,
                      fontFamily: 'SourceSansPro-Bold',
                    }}>
                    {item.kelas}
                  </Text>
                  {item.id_matakuliah.map((v, i) => (
                    <View key={i}>
                      <Text
                        style={{
                          color: '#F3F3F3',
                          fontSize: 20,
                          fontFamily: 'SourceSansPro-Regular',
                        }}>
                        {v.matkul}
                      </Text>
                    </View>
                  ))}
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
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    marginHorizontal: 10,
  },
  content: {
    backgroundColor: '#3D5B90',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
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
});
export default GetKelas;
