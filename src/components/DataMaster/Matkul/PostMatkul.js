import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

function PostMatkul({navigation}) {
  const [valueKodeMatkul, setKodeValueMatkul] = useState('');
  const [valueMatkul, setValueMatkul] = useState('');

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

  const [loading, setLoading] = useState(false);

  const validation = () => {
    if (valueKodeMatkul && valueMatkul !== '') {
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
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('https://project-fadhil-heroku.herokuapp.com/api/matkul', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        kode: valueKodeMatkul,
        matkul: valueMatkul,
      }),
    })
      .then(response => {
        setLoading(false);
        console.log(response);
        response.text();
        if (!response.ok) {
          throw Error(displayAlert());
        }
        navigation.goBack();
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginHorizontal: 10,
          color: 'black',
        }}>
        Kode Mata Kuliah
      </Text>
      <TextInput
        placeholder={'SI401'}
        autoCapitalize="characters"
        value={valueKodeMatkul}
        placeholderTextColor="#999999"
        onChangeText={value => {
          setKodeValueMatkul(value.trim());
        }}
        style={styles.input}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginHorizontal: 10,
          color: 'black',
        }}>
        Mata Kuliah
      </Text>
      <TextInput
        placeholder={'Algoritma dan Pemrograman'}
        placeholderTextColor="#999999"
        onChangeText={value => setValueMatkul(value.trim())}
        style={styles.input}
        value={valueMatkul}
      />
      <TouchableOpacity onPress={validation}>
        <View
          style={{
            backgroundColor: '#5665d2',
            padding: 10,
            borderRadius: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
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
});

export default PostMatkul;
