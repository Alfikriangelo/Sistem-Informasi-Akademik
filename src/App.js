import * as React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Get from './components/DataMaster/Ruangan/Get';
import Post from './components/DataMaster/Ruangan/Post';
import Details from './components/DataMaster/Ruangan/Details';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './components/DataMaster/Home';
import GetKelas from './components/DataMaster/Kelas/GetKelas';
import PostKelas from './components/DataMaster/Kelas/PostKelas';
import SplashScreen from './components/DataMaster/SplashScreen';
import GetMatkul from './components/DataMaster/Matkul/GetMatkul';
import PostMatkul from './components/DataMaster/Matkul/PostMatkul';
import DetailMatkul from './components/DataMaster/Matkul/DetailMatkul';
import GetProdi from './components/DataMaster/Prodi/GetProdi';
import PostProdi from './components/DataMaster/Prodi/PostProdi';
import DetailProdi from './components/DataMaster/Prodi/DetailProdi';
import DetailKelas from './components/DataMaster/Kelas/DetailKelas';
import HomeMahasiswa from './components/Mahasiswa/HomeMahasiswa';
import PostMahasiswa from './components/Mahasiswa/PostMahasiswa';
import DetailMahasiswa from './components/Mahasiswa/DetailMahasiswa';
import HomeAbsensi from './components/Absensi/HomeAbsensi';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DataMaster() {
  return (
    <Stack.Navigator initialRouteName="Data Master">
      <Stack.Screen
        name="Home"
        options={{
          title: 'Sistem Informasi Akademik',
          headerTitleStyle: {alignSelf: 'center', fontSize: 20},
        }}
        component={Home}
      />
      <Stack.Screen
        name="GetProdi"
        component={GetProdi}
        options={({navigation}) => ({
          title: 'Data Prodi',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),

          headerTitleStyle: {alignSelf: 'center', fontSize: 20},
          headerRight: () => (
            <Ionicons
              name={'ios-add-circle'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.navigate('Post Prodi')}
              style={{marginRight: 15}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Post Prodi"
        component={PostProdi}
        options={({navigation}) => ({
          title: 'Tambah',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Detail Prodi"
        component={DetailProdi}
        options={({navigation}) => ({
          title: 'Rincian',
          headerTitleStyle: {fontSize: 20},
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Get Matkul"
        component={GetMatkul}
        options={({navigation}) => ({
          title: 'Data Matkul',
          headerTitleStyle: {alignSelf: 'center', fontSize: 20},
          headerRight: () => (
            <Ionicons
              name={'ios-add-circle'}
              size={40}
              onPress={() => navigation.navigate('Post Matkul')}
              color="#5665D2"
              style={{marginRight: 15}}
            />
          ),
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Post Matkul"
        component={PostMatkul}
        options={({navigation}) => ({
          title: 'Tambah',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              onPress={() => navigation.goBack()}
              color="#5665D2"
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Detail Matkul"
        options={({navigation}) => ({
          title: 'Rincian',
          headerTitleStyle: {fontSize: 20},
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
        component={DetailMatkul}
      />
      <Stack.Screen
        name="GetKelas"
        component={GetKelas}
        options={({navigation}) => ({
          title: 'Kelas dan Mata Kuliah',
          headerRight: () => (
            <Ionicons
              name={'ios-add-circle'}
              size={40}
              onPress={() => navigation.navigate('Post Kelas')}
              color="#5665D2"
              style={{marginRight: 15}}
            />
          ),
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Post Kelas"
        component={PostKelas}
        options={({navigation}) => ({
          title: 'Tambah',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Detail Kelas"
        options={({navigation}) => ({
          title: 'Rincian',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
        component={DetailKelas}
      />

      <Stack.Screen
        name="Get"
        component={Get}
        options={({navigation}) => ({
          title: 'Data Ruangan',
          headerTitleStyle: {alignSelf: 'center', fontSize: 20},
          headerRight: () => (
            <Ionicons
              name={'ios-add-circle'}
              size={40}
              onPress={() => navigation.navigate('Post')}
              color="#5665D2"
              style={{marginRight: 15}}
            />
          ),
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={({navigation}) => ({
          title: 'Tambah',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        options={({navigation}) => ({
          title: 'Rincian',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
        component={Details}
      />
    </Stack.Navigator>
  );
}

function CustomHeader({title}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
      }}>
      <View style={{flex: 1.5, justifyContent: 'center'}}>
        <Text style={{color: 'black', textAlign: 'center'}}>{title}</Text>
      </View>
    </View>
  );
}

function KehadiranScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Kehadiran" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Setting</Text>
      </View>
    </SafeAreaView>
  );
}
function AbsensiScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Absensi"
        options={({navigation}) => ({
          title: 'Absensi',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerRight: () => (
            <Ionicons
              name={'ios-add-circle'}
              size={40}
              color="#5665D2"
              style={{marginRight: 15}}
            />
          ),
        })}
        component={HomeAbsensi}
      />
    </Stack.Navigator>
  );
}
function DataMahasiswaScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Mahasiswa"
        options={({navigation}) => ({
          title: 'Data Mahasiswa',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerRight: () => (
            <Ionicons
              name={'ios-add-circle'}
              size={40}
              color="#5665D2"
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Post Mahasiswa')}
            />
          ),
        })}
        component={HomeMahasiswa}
      />
      <Stack.Screen
        name="Post Mahasiswa"
        options={({navigation}) => ({
          title: 'Tambah',
          headerTitleStyle: {fontSize: 20},
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              style={{marginLeft: 10}}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        component={PostMahasiswa}
      />
      <Stack.Screen
        name="Detail Mahasiswa"
        options={({navigation}) => ({
          title: 'Rincian',
          headerLeft: () => (
            <Ionicons
              name={'chevron-back-outline'}
              size={40}
              color="#5665D2"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}
            />
          ),
        })}
        component={DetailMahasiswa}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash Screen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Master" options={{headerShown: false}}>
          {() => (
            <Tab.Navigator
              tabBarOptions={{
                keyboardHidesTabBar: true,
                labelStyle: {paddingBottom: 20, fontSize: 12},
                style: {height: 60},
                showLabel: false,
              }}>
              <Tab.Screen
                name="Master"
                component={DataMaster}
                options={({route}) => ({
                  tabBarIcon: ({focused}) =>
                    focused ? (
                      <Ionicons
                        name={'home-outline'}
                        size={30}
                        color="#5665D2"
                      />
                    ) : (
                      <Ionicons name={'home-outline'} size={30} color="grey" />
                    ),
                })}
              />
              <Tab.Screen
                name="Kehadiran"
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? (
                      <Ionicons
                        name={'calendar-outline'}
                        size={30}
                        color="#5665D2"
                      />
                    ) : (
                      <Ionicons
                        name={'calendar-outline'}
                        size={30}
                        color="grey"
                      />
                    ),
                }}
                component={KehadiranScreen}
              />
              <Tab.Screen
                name="Absensi"
                component={AbsensiScreen}
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? (
                      <Ionicons
                        name={'checkbox-outline'}
                        size={30}
                        color="#5665D2"
                      />
                    ) : (
                      <Ionicons
                        name={'checkbox-outline'}
                        size={30}
                        color="grey"
                      />
                    ),
                }}
              />
              <Tab.Screen
                name="Mahasiswa"
                component={DataMahasiswaScreen}
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? (
                      <Ionicons
                        name={'people-outline'}
                        size={30}
                        color="#5665D2"
                      />
                    ) : (
                      <Ionicons
                        name={'people-outline'}
                        size={30}
                        color="grey"
                      />
                    ),
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
