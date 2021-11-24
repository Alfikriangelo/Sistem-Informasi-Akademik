import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GetProdi = ({navigation}) => {
  const [prodi, setProdi] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollA = useRef(new Animated.Value(0)).current;

  const getProdi = () => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/prodi';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setProdi(responseJson);
        setMasterData(responseJson);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      getProdi();
    });
    return unSubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    getProdi();
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemProdi = item.nama_prodi
          ? item.nama_prodi.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemProdi.indexOf(textData) > -1;
      });
      setProdi(newData);
      setSearch(text);
    } else {
      setProdi(masterData);
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
            source={require('../../../assets/Prodi.jpg')}
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
            <ActivityIndicator marginTop={20} color={'#D4A18A'} />
          ) : (
            <View style={{marginVertical: 10}}>
              {prodi.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.list}
                  onPress={() =>
                    navigation.navigate('Detail Prodi', {
                      item: item,
                    })
                  }>
                  <Text
                    style={{
                      fontFamily: 'SourceSansPro-Regular',
                      color: '#f3f3f3',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    {item.nama_prodi}
                  </Text>
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
  list: {
    backgroundColor: '#D4A18A',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 25,
    borderRadius: 20,
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
});

export default GetProdi;
