import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';

const DetailProdi = ({route, navigation}) => {
  const {item} = route.params;
  const [prodi, setProdi] = useState({
    nama_prodi: item.nama_prodi,
  });

  const onChangeProdi = value => {
    setProdi({...prodi, nama_prodi: value});
  };

  const displayAlert = () => {
    Alert.alert('Kamu Yakin?', 'Data Ini Akan Dihapus', [
      {
        text: 'Tidak Terima Kasih',
        onPress: () => console.log('Cancel'),
      },
      {
        text: 'Hapus',
        onPress: deleteData,
      },
    ]);
  };

  const displayAlert2 = () => {
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

  const validation = () => {
    if (prodi.nama_prodi !== '') {
      updateData();
    } else {
      Alert.alert('Ada Data Yang Belum Diisi', 'Silahkan Diperbaiki', [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
        },
      ]);
    }
  };

  const updateData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(`https://project-fadhil-heroku.herokuapp.com/api/prodi/${item._id}`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        nama_prodi: prodi.nama_prodi,
      }),
    })
      .then(response => {
        response.text();
        if (!response.ok) {
          throw Error(displayAlert2());
        }
        navigation.goBack();
        console.log(response);
      })
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  const deleteData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(`https://project-fadhil-heroku.herokuapp.com/api/prodi/${item._id}`, {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify({
        nama_prodi: prodi.nama_prodi,
      }),
    })
      .then(response => {
        response.text();

        navigation.goBack();
      })
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Prodi</Text>
      <TextInput
        placeholder={'Prodi'}
        placeholderTextColor="#999999"
        onChangeText={value => onChangeProdi(value.trim())}
        style={styles.input}
        value={prodi.nama_prodi}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={validation} style={styles.updateButton}>
          <View style={{padding: 10}}>
            <Text style={{color: 'white', textAlign: 'center'}}>Perbarui</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={displayAlert} style={styles.deleteButton}>
          <View style={{padding: 10}}>
            <Text style={{color: 'red', textAlign: 'center'}}>Hapus</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    borderColor: '#5665D2',
    color: 'black',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    marginLeft: 10,
    marginHorizontal: 15,
  },
  updateButton: {
    borderRadius: 5,
    backgroundColor: '#5665D2',
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default DetailProdi;
