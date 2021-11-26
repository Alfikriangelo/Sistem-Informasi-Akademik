import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const PostKelas = ({navigation}) => {
  const [value, setValue] = useState([]);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);

  const [valueKelas, setValueKelas] = useState('');
  const [loading, setLoading] = useState(false);

  const displayAlert = () => {
    Alert.alert(
      'Data Sudah Pernah Digunakan',
      'Silahkan Menggunakan Data Yang Lain',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel'),
        },
      ],
    );
  };

  const getApiMatkul = () => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/matkul';
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
      })
      .catch(error => {
        console.log('Error : ', error);
      });
  };

  useEffect(() => {
    getApiMatkul();
  }, []);

  const validation = () => {
    if (valueKelas !== '') {
      saveData();
    } else {
      Alert.alert('Ada Data Yang Belum Diisi', 'Silahkan Diperbaiki', [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
        },
      ]);
    }
  };

  const saveData = () => {
    const matkul = data.filter(item => value.includes(item.matkul));
    console.log(matkul);
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    fetch('https://project-fadhil-heroku.herokuapp.com/api/kelas', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        kelas: valueKelas,
        id_matakuliah: matkul,
      }),
    })
      .then(response => {
        setLoading(false);
        response.text();
        if (!response.ok) {
          throw Error(displayAlert());
        }
        console.log(response);
        navigation.goBack();
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 20,
          marginHorizontal: 10,
        }}>
        Kelas
      </Text>
      <TextInput
        value={valueKelas}
        placeholder={'3 SI A'}
        placeholderTextColor="#999999"
        onChangeText={value => setValueKelas(value.trim())}
        style={styles.input}
      />
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 20,
          marginHorizontal: 10,
        }}>
        Mata kuliah
      </Text>
      <View style={{marginHorizontal: 10}}>
        <DropDownPicker
          translation={{
            SELECTED_ITEMS_COUNT_TEXT: '{count} Mata Kuliah Yang Dipilih',
          }}
          style={styles.picker}
          multiple={true}
          min={0}
          max={5}
          open={open}
          value={value}
          setOpen={setOpen}
          textStyle={{
            fontSize: 15,
            opacity: 0.4,
          }}
          dropDownContainerStyle={{
            borderColor: '#5665D2',
          }}
          placeholder="Algoritma dan Pemrograman Dasar"
          setValue={setValue}
          items={data.map(item => ({label: item.matkul, value: item.matkul}))}
        />
      </View>
      <TouchableOpacity onPress={validation}>
        <View
          style={{
            backgroundColor: '#5665D2',
            padding: 10,
            borderRadius: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 8,
    backgroundColor: '#ffff',
  },
  input: {
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#5665D2',
    fontSize: 15,
    marginHorizontal: 10,
    color: 'black',
  },
  picker: {
    overlayColor: '#5665D2',
    borderColor: '#5665D2',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default PostKelas;
