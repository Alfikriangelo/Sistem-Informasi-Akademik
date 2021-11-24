import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

function PostProdi({navigation}) {
  const [prodi, setProdi] = useState({
    nama_prodi: '',
  });
  const [loading, setLoading] = useState(false);

  const onChangeProdi = value => {
    setProdi({...prodi, nama_prodi: value});
  };

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

  const saveData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('https://project-fadhil-heroku.herokuapp.com/api/prodi', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        nama_prodi: prodi.nama_prodi,
      }),
    })
      .then(response => {
        setLoading(false);
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
        Prodi
      </Text>
      <TextInput
        placeholderTextColor="#999999"
        placeholder={'D4 - TEKNIK INFORMATIKA'}
        onChangeText={value => onChangeProdi(value)}
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
export default PostProdi;
