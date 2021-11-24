import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Post({navigation}) {
  const [ruangan, setRuangan] = useState({
    ruangan: '',
  });

  const [loading, setLoading] = useState(false);

  const onChangeRuangan = value => {
    setRuangan({...ruangan, ruangan: value});
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
    fetch('https://project-fadhil-heroku.herokuapp.com/api/ruangan', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        ruangan: ruangan.ruangan,
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
          fontWeight: 'bold',
          color: 'black',
          fontSize: 20,
          marginHorizontal: 10,
        }}>
        Ruangan
      </Text>

      <TextInput
        placeholder={'130'}
        placeholderTextColor="#999999"
        onChangeText={value => onChangeRuangan(value)}
        style={styles.input}
      />

      <TouchableOpacity onPress={saveData}>
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
