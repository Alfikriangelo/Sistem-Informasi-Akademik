import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
  TextInput,
  Animated,
  SafeAreaView,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Get = ({navigation}) => {
  const [ruangan, setRuangan] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const scrollA = useRef(new Animated.Value(0)).current;

  const getRuangan = () => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/ruangan';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setRuangan(responseJson);
        setMasterData(responseJson);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      getRuangan();
    });
    return unSubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    getRuangan();
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemRuangan = item.ruangan
          ? item.ruangan.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemRuangan.indexOf(textData) > -1;
      });
      setRuangan(newData);
      setSearch(text);
    } else {
      setRuangan(masterData);
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
            source={require('../../../assets/Ruangan.jpg')}
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
            <ActivityIndicator marginTop={20} color={'#9A91BE'} />
          ) : (
            <View style={{marginVertical: 10}}>
              {ruangan.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.list}
                  onPress={() =>
                    navigation.navigate('Details', {
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
                    {item.ruangan}
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
    backgroundColor: 'white',
  },
  list: {
    backgroundColor: '#9A91BE',
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
export default Get;
