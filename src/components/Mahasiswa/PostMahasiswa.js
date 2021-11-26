import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-paper';

const PostMahasiswa = ({navigation}) => {
  const [gender, setGender] = useState();
  const [pic, setPic] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [valueKelas, setValueKelas] = useState('');
  const [dataKelas, setDataKelas] = useState([]);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [valueProvinsi, setValueProvinsi] = useState('');
  const [dataKota, setDataKota] = useState([]);
  const [valueKota, setValueKota] = useState('');
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [valueKecamatan, setValueKecamatan] = useState('');
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [dataProvinsiOrtu, setDataProvinsiOrtu] = useState([]);
  const [valueProvinsiOrtu, setValueProvinsiOrtu] = useState('');
  const [dataKotaOrtu, setDataKotaOrtu] = useState([]);
  const [valueKotaOrtu, setValueKotaOrtu] = useState('');
  const [dataKecamatanOrtu, setDataKecamatanOrtu] = useState([]);
  const [valueKecamatanOrtu, setValueKecamatanOrtu] = useState('');
  const [dataKelurahanOrtu, setDataKelurahanOrtu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueName, setValueName] = useState('');
  const [valueNim, setValueNim] = useState('');
  const [valueNik, setValueNik] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valueKodePos, setValueKodePos] = useState('');
  const [valueAlamat, setValueAlamat] = useState('');
  const [valueKodePosOrtu, setValueKodePosOrtu] = useState('');
  const [valueAlamatOrtu, setValueAlamatOrtu] = useState('');
  const [valueNotelp, setValueNoTelp] = useState('');

  const [kehadiran, setKehadiran] = useState({
    nim: '',
    nama: '',
    alamat: '',
    id_programStudi: '',
    noTelp: '',
    alamatOrtu: '',
    nik: '',
    gender: '',
    kelas: '',
    foto: '',
    kodePosMhs: '',
  });

  console.log(valueKelas);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const uploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancelled Image Selection');
      } else if (response.errorCode == 'permission') {
        setToastMsg('Permission not Satisfied');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert(
          'Maksimum Ukuran Gambar Terlampaui',
          'Silahkan Pilih Gambar Berukuran Dibawah 2 MB',
          [{text: 'OK'}],
        );
      } else {
        setPic(response.assets[0].base64);
      }
    });
  };

  const removeImage = () => {
    setPic('');
    setToastMsg('Gambar Telah Dihapus');
  };

  const apiProvinsi = useCallback(async () => {
    const apiURL = 'https://dev.farizdotid.com/api/daerahindonesia/provinsi';

    await fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setDataProvinsi(resJson.provinsi);
      })
      .catch(error => {
        console.log('Error1 : ', error);
      });
  }, []);

  const apiProvinsiOrtu = useCallback(async () => {
    const apiURL = 'https://dev.farizdotid.com/api/daerahindonesia/provinsi';

    await fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setDataProvinsiOrtu(resJson.provinsi);
      })
      .catch(error => {
        console.log('Error1 : ', error);
      });
  }, []);

  const handleChangeProvinsi = useCallback(
    async value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${value}`;
      setValueProvinsi(value);

      // console.log(apiURL);
      await fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          setDataKota(resJson.kota_kabupaten);
        })
        .catch(error => {
          console.log('Error3 : ', error);
        });
    },
    [value],
  );

  const handleChangeProvinsiOrtu = useCallback(
    async value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${value}`;
      setValueProvinsiOrtu(value);

      // console.log(apiURL);
      await fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          setDataKotaOrtu(resJson.kota_kabupaten);
        })
        .catch(error => {
          console.log('Error3 : ', error);
        });
    },
    [value],
  );

  const handleChangeKota = useCallback(
    async value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${value}`;
      setValueKota(value);

      // console.log(apiURL);
      await fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          setDataKecamatan(resJson.kecamatan);
        })
        .catch(error => {
          console.log('Error5 : ', error);
        });
    },
    [value],
  );
  const handleChangeKotaOrtu = useCallback(
    async value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${value}`;
      setValueKotaOrtu(value);

      // console.log(apiURL);
      await fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          setDataKecamatanOrtu(resJson.kecamatan);
        })
        .catch(error => {
          console.log('Error5 : ', error);
        });
    },
    [value],
  );

  const handleChangeKecamatan = useCallback(
    async value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${value}`;
      setValueKecamatan(value);

      // console.log(apiURL);
      await fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          setDataKelurahan(resJson.kelurahan);
        })
        .catch(error => {
          console.log('Error7 : ', error);
        });
    },
    [value],
  );

  const handleChangeKecamatanOrtu = useCallback(
    async value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${value}`;
      setValueKecamatanOrtu(value);

      // console.log(apiURL);
      await fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          setDataKelurahanOrtu(resJson.kelurahan);
        })
        .catch(error => {
          console.log('Error7 : ', error);
        });
    },
    [value],
  );

  const getProgramStudi = () => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/prodi';
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
      })
      .catch(error => {
        console.log('Error8 : ', error);
      });
  };

  const getKelas = () => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/kelas';
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setDataKelas(resJson);
      })
      .catch(error => {
        console.log('Error9 : ', error);
      });
  };

  const displayAlert = () => {
    Alert.alert('Nim Sudah Pernah Digunakan', 'Silahkan Diperbaiki', [
      {
        text: 'OK',
        onPress: () => console.log('OK'),
      },
    ]);
  };

  const validation = () => {
    if (
      (gender &&
        valueKelas &&
        value &&
        valueProvinsi &&
        valueKecamatan &&
        valueKota &&
        valueProvinsiOrtu &&
        valueKotaOrtu &&
        valueKecamatanOrtu &&
        valueName &&
        valueNim &&
        valueNik &&
        valueEmail &&
        valueKodePos &&
        valueAlamatOrtu &&
        valueAlamat &&
        valueKodePos &&
        valueKodePosOrtu &&
        valueNotelp) !== ''
    ) {
      if (!/\S+@\S+\.\S+/.test(valueEmail)) {
        Alert.alert('Email Tidak Valid', 'Silahkan Diperbaiki', [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
          },
        ]);
      } else {
        saveData();
      }
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
    const dataProgramStudi = data.filter(item =>
      value.includes(item.nama_prodi),
    );

    const dataKelass = dataKelas.filter(item =>
      valueKelas.includes(item.kelas),
    );

    const dataProvinsii = dataProvinsi.filter(
      item => valueProvinsi === item.id,
    );
    const dataKotaa = dataKota.filter(item => valueKota === item.id);
    const dataKecamatann = dataKecamatan.filter(
      item => valueKecamatan === item.id,
    );
    const dataProvinsiOrtuu = dataProvinsiOrtu.filter(
      item => valueProvinsiOrtu === item.id,
    );
    const dataKotaOrtuu = dataKotaOrtu.filter(
      item => valueKotaOrtu === item.id,
    );
    const dataKecamatanOrtuu = dataKecamatanOrtu.filter(
      item => valueKecamatanOrtu === item.id,
    );

    // let form = new FormData();

    // form.append('foto', pic);
    // form.append('nim', kehadiran.nim);
    // form.append('nama', kehadiran.nama);
    // form.append('nik', kehadiran.nik);
    // form.append('email', kehadiran.email);
    // form.append('noTelp', kehadiran.noTelp);

    // form.append('id_programStudi', dataProgramStudi);
    // form.append('id_kelas', dataKelass);

    setLoading(true);

    fetch('https://project-fadhil-heroku.herokuapp.com/api/mahasiswa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ',
      },
      // body: form,
      body: JSON.stringify({
        nim: valueNim,
        nik: valueNik,
        nama: valueName,
        jenisKelamin: gender,
        id_programStudi: dataProgramStudi,
        id_kelas: dataKelass,
        email: valueEmail,
        alamat: valueAlamat,
        noTelp: valueNotelp,
        alamatOrtu: valueAlamatOrtu,
        kodeposMhs: valueKodePos,
        kodeposOrtu: valueKodePosOrtu,
        provinsiMhs: dataProvinsii.length > 0 ? dataProvinsii[0].nama : '',
        kabupatenMhs: dataKotaa.length > 0 ? dataKotaa[0].nama : '',
        kecamatanMhs: dataKecamatann.length > 0 ? dataKecamatann[0].nama : '',
        provinsiOrtu:
          dataProvinsiOrtuu.length > 0 ? dataProvinsiOrtuu[0].nama : '',
        kabupatenOrtu: dataKotaOrtuu.length > 0 ? dataKotaOrtuu[0].nama : '',
        kecamatanOrtu:
          dataKecamatanOrtuu.length > 0 ? dataKecamatanOrtuu[0].nama : '',
      }),
    })
      .then(response => {
        response.text();
        if (!response.ok) {
          throw Error(displayAlert());
        }
        navigation.goBack();
        console.log(response);
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getKelas();
    getProgramStudi();
    apiProvinsiOrtu();
    apiProvinsi();
  }, []);

  const pickerRef = useRef();

  function openn() {
    pickerRef.current.focus();
  }

  function closee() {
    pickerRef.current.blur();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gambar}>
          <TouchableHighlight
            onPress={() => uploadImage()}
            underlayColor="rgba(0,0,0,0)">
            <Avatar.Image
              size={250}
              style={{backgroundColor: 'grey'}}
              source={{uri: 'data:image/png;base64, ' + pic}}
            />
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.gambar,
            {
              marginTop: 25,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 30,
              color: 'white',
            },
          ]}>
          <TouchableOpacity
            onPress={() => removeImage()}
            style={styles.btnGambar}
            mode="contained">
            <Text style={{color: 'red', textAlign: 'center'}}>Hapus Foto</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          NIM
        </Text>
        <TextInput
          keyboardType="number-pad"
          placeholderTextColor="#999999"
          placeholder={'2138977'}
          value={valueNim}
          onChangeText={value => setValueNim(value)}
          style={styles.input}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          Nama
        </Text>
        <TextInput
          value={valueName}
          placeholderTextColor="#999999"
          placeholder={'Alfikri'}
          onChangeText={value => setValueName(value)}
          style={styles.input}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          Jenis Kelamin
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: 'grey',
          }}>
          <Picker
            mode="dropdown"
            ref={pickerRef}
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
            <Picker.Item label="Jenis Kelamin" value="" />
            <Picker.Item label="Laki-Laki" value="Laki-Laki" />
            <Picker.Item label="Perempuan" value="Perempuan" />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginLeft: 10,
              }}>
              Kelas
            </Text>

            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={valueKelas}
                onValueChange={(itemValue, itemIndex) =>
                  setValueKelas(itemValue)
                }>
                <Picker.Item label="Kelas" value="" />
                {dataKelas.map(item => (
                  <Picker.Item label={item.kelas} value={item.kelas} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginLeft: 10,
              }}>
              Program Studi
            </Text>
            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
                <Picker.Item label="Program Studi" value="" />
                {data.map(item => (
                  <Picker.Item
                    label={item.nama_prodi}
                    value={item.nama_prodi}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          NIK
        </Text>
        <TextInput
          value={valueNik}
          keyboardType="number-pad"
          placeholderTextColor="#999999"
          placeholder={'2138977'}
          onChangeText={value => setValueNik(value)}
          style={styles.input}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          Email
        </Text>
        <TextInput
          value={valueEmail}
          placeholderTextColor="#999999"
          placeholder={'alfikri@gmail.com'}
          onChangeText={value => setValueEmail(value)}
          style={styles.input}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          Alamat
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{width: '50%'}}>
            <View
              style={{
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
                backgroundColor: 'grey',
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={valueProvinsi}
                onValueChange={value => handleChangeProvinsi(value)}>
                <Picker.Item label="Provinsi" value="" />
                {dataProvinsi.map(item => (
                  <Picker.Item label={item.nama} value={item.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={valueKota}
                onValueChange={value => handleChangeKota(value)}>
                <Picker.Item label="Kota" value="" />
                {dataKota.map(item => (
                  <Picker.Item label={item.nama} value={item.id} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '50%'}}>
            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={valueKecamatan}
                onValueChange={value => handleChangeKecamatan(value)}>
                <Picker.Item label="Kecamatan" value="" />
                {dataKecamatan.map(item => (
                  <Picker.Item label={item.nama} value={item.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{width: '45%', marginRight: 10}}>
            <TextInput
              value={valueKodePos}
              keyboardType="number-pad"
              placeholderTextColor="#999999"
              placeholder={'Kode Pos'}
              style={styles.input2}
              onChangeText={value => setValueKodePos(value)}
            />
          </View>
        </View>
        <TextInput
          placeholderTextColor="#999999"
          placeholder={'Alamat Lengkap'}
          onChangeText={value => setValueAlamat(value)}
          style={styles.input}
          value={valueAlamat}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          No Telepon
        </Text>
        <TextInput
          keyboardType="number-pad"
          placeholderTextColor="#999999"
          placeholder={'08xxxxxxx'}
          value={valueNotelp}
          onChangeText={value => setValueNoTelp(value)}
          style={styles.input}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          Alamat Orang Tua
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{width: '50%'}}>
            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={valueProvinsiOrtu}
                onValueChange={value => handleChangeProvinsiOrtu(value)}>
                <Picker.Item label="Provinsi" value="" />
                {dataProvinsiOrtu.map(item => (
                  <Picker.Item label={item.nama} value={item.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={valueKotaOrtu}
                onValueChange={value => handleChangeKotaOrtu(value)}>
                <Picker.Item label="Kota" value="" />
                {dataKotaOrtu.map(item => (
                  <Picker.Item label={item.nama} value={item.id} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '50%'}}>
            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Picker
                mode="dropdown"
                ref={pickerRef}
                selectedValue={valueKecamatanOrtu}
                onValueChange={value => handleChangeKecamatanOrtu(value)}>
                <Picker.Item label="Kecamatan" value="" />
                {dataKecamatanOrtu.map(item => (
                  <Picker.Item label={item.nama} value={item.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{width: '45%', marginRight: 10}}>
            <TextInput
              keyboardType="number-pad"
              placeholderTextColor="#999999"
              placeholder={'Kode Pos'}
              style={styles.input2}
              value={valueKodePosOrtu}
              onChangeText={value => setValueKodePosOrtu(value)}
            />
          </View>
        </View>
        <TextInput
          placeholderTextColor="#999999"
          placeholder={'Alamat Lengkap'}
          onChangeText={value => setValueAlamatOrtu(value)}
          style={styles.input}
          value={valueAlamatOrtu}
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
      </ScrollView>
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
  gambar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGambar: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    color: 'red',
    fontSize: 15,
    padding: 10,
    width: 200,
    marginHorizontal: 15,
  },
  input: {
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#5665D2',
    fontSize: 15,
    color: 'black',
    marginHorizontal: 10,
  },
  input2: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#5665D2',
    fontSize: 15,
    height: 56,
    color: 'black',
  },
  picker: {
    overlayColor: '#5665D2',
    borderColor: '#5665D2',
    marginBottom: 10,
    marginTop: 10,
    zIndex: 9,
  },
  picker2: {
    zIndex: 10,
    overlayColor: '#5665D2',
    borderColor: '#5665D2',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default PostMahasiswa;
