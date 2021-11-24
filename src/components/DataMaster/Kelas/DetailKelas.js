import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

const DetailKelas = ({route, navigation}) => {
  const {item} = route.params;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [newValue, setNewValue] = useState([]);
  const matkul = item.id_matakuliah.map(value => value.matkul);

  const [kelas, setKelas] = useState({
    kelas: item.kelas,
    matkul: matkul,
  });

  console.log(item.matkul);

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

  const onChangeKelas = value => {
    setKelas({...kelas, kelas: value});
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

  const updateData = () => {
    const matkul = data.filter(item => newValue.includes(item.matkul));
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('https://project-fadhil-heroku.herokuapp.com/api/kelas/' + item._id, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        kelas: kelas.kelas,
        id_matakuliah: matkul,
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
    fetch(`https://project-fadhil-heroku.herokuapp.com/api/kelas/${item._id}`, {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify({
        kelas: kelas.kelas,
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
      <Text style={styles.text}>Kelas</Text>
      <TextInput
        placeholder={'Kelas'}
        placeholderTextColor="#999999"
        onChangeText={value => onChangeKelas(value)}
        style={styles.input}
        value={kelas.kelas}
      />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',

            color: 'black',
          }}>
          Mata Kuliah
        </Text>
        <DropDownPicker
          style={styles.picker}
          multiple={true}
          min={0}
          max={5}
          open={open}
          setOpen={setOpen}
          placeholder="Algoritma dan Pemrograman Dasar"
          textStyle={{
            fontSize: 15,
            opacity: 0.4,
          }}
          value={newValue}
          setValue={setNewValue}
          items={data.map(item => ({
            label: item.matkul,
            value: item.matkul,
          }))}
          defaultValue={item.matkul}
          translation={{
            SELECTED_ITEMS_COUNT_TEXT: '{count} Mata Kuliah Yang Dipilih',
          }}
          dropDownContainerStyle={{
            borderColor: '#5665D2',
          }}
        />
      </View>
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
  picker: {
    overlayColor: '#5665D2',
    borderColor: '#5665D2',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default DetailKelas;
