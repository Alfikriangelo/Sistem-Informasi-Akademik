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
  const [matkul, setMatkul] = useState({
    kode: '',
    matkul: '',
  });

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

  const onChangeMatkul = value => {
    setMatkul({...matkul, matkul: value});
  };

  const onChangeKode = value => {
    setMatkul({...matkul, kode: value});
  };

  const saveData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('https://project-fadhil-heroku.herokuapp.com/api/matkul', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        kode: matkul.kode,
        matkul: matkul.matkul,
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
        placeholderTextColor="#999999"
        onChangeText={value => onChangeKode(value)}
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
        onChangeText={value => onChangeMatkul(value)}
        style={styles.input}
      />
      <TouchableOpacity onPress={saveData}>
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
