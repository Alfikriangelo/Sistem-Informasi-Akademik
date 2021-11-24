import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

const DetailMatkul = ({route, navigation}) => {
  const {item} = route.params;
  const [matkul, setMatkul] = useState({
    kode: item.kode,
    matkul: item.matkul,
  });

  console.log(matkul);

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

  const onChangeKode = value => {
    setMatkul({...matkul, kode: value});
  };

  const onChangeMatkul = value => {
    setMatkul({...matkul, matkul: value});
  };

  const updateData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(
      `https://project-fadhil-heroku.herokuapp.com/api/matkul/${item._id}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          kode: matkul.kode,
          matkul: matkul.matkul,
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
      `https://project-fadhil-heroku.herokuapp.com/api/matkul/${item._id}`,
      {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify({
          kode: matkul.kode,
          matkul: matkul.matkul,
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
      <Text style={styles.text}>Kode Mata Kuliah</Text>
      <TextInput
        placeholderTextColor="#999999"
        placeholder={'Kode Mata Kuliah'}
        onChangeText={value => onChangeKode(value)}
        style={styles.input}
        value={matkul.kode}
      />
      <Text style={styles.text}>Mata Kuliah</Text>
      <TextInput
        placeholderTextColor="#999999"
        placeholder={'Mata Kuliah'}
        onChangeText={value => onChangeMatkul(value)}
        style={styles.input}
        value={matkul.matkul}
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

export default DetailMatkul;
