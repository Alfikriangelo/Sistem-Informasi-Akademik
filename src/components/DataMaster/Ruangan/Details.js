import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Detail = ({route, navigation}) => {
  const {item} = route.params;

  const [ruangan, setRuangan] = useState({
    ruangan: item.ruangan,
  });

  const onChangeRuangan = value => {
    setRuangan({...ruangan, ruangan: value});
  };

  const displayAlert = () => {
    Alert.alert('Kamu Yakin?', 'Data Ini akan terhapus', [
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

  const updateData = () => {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    fetch(
      'https://project-fadhil-heroku.herokuapp.com/api/ruangan/' + item._id,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          ruangan: ruangan.ruangan,
        }),
      },
    )
      .then(response => {
        response.text();
        if (!response.ok) {
          throw Error(displayAlert2());
        }
        navigation.goBack();
        console.log(response);
      })

      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const deleteData = () => {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    fetch(
      `https://project-fadhil-heroku.herokuapp.com/api/ruangan/${item._id}`,
      {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify({
          ruangan: ruangan.ruangan,
        }),
      },
    )
      .then(response => {
        response.text();
        navigation.goBack();
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ruangan</Text>
      <TextInput
        placeholder={'Ruang Kelas'}
        onChangeText={value => onChangeRuangan(value)}
        placeholderTextColor="#999999"
        style={styles.input}
        value={ruangan.ruangan}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={updateData} style={styles.updateButton}>
          <View style={{padding: 10}}>
            <Text style={{color: 'white', textAlign: 'center'}}>Perbarui</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={displayAlert}>
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
    marginHorizontal: 15,
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
    marginHorizontal: 15,
    marginTop: 10,
  },
});

//make this component available to the app
export default Detail;
