import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const DetailMahasiswa = ({navigation, route}) => {
  const {item} = route.params;
  const [gender, setGender] = useState(null);
  const [pic, setPic] = useState('');
  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [valueKelas, setValueKelas] = useState(null);
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

  const [kehadiran, setKehadiran] = useState({
    nim: item.nim,
    nama: item.nama,
    email: item.email,
    alamat: item.alamat,
    id_programStudi: item.id_programStudi,
    noTelp: item.noTelp,
    alamatOrtu: item.alamatOrtu,
    nik: item.nik,
    gender: item.gender,
    kelas: item.kelas,
    kodeposMhs: item.kodeposMhs,
    kodeposOrtu: item.kodeposOrtu,
    kelas: item.kelas,
    jenisKelamin: item.jenisKelamin,
  });

  console.log(kehadiran.id_programStudi);

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
    value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${value}`;
      setValueProvinsiOrtu(value);

      // console.log(apiURL);
      fetch(apiURL)
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
    value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${value}`;
      setValueKotaOrtu(value);

      // console.log(apiURL);
      fetch(apiURL)
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
    value => {
      const apiURL = `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${value}`;
      setValueKecamatanOrtu(value);

      // console.log(apiURL);
      fetch(apiURL)
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

  const getKelas = useCallback(() => {
    const apiURL = 'https://project-fadhil-heroku.herokuapp.com/api/kelas';
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setDataKelas(resJson);
      })
      .catch(error => {
        console.log('Error9 : ', error);
      });
  }, []);

  const onChangeNim = value => {
    setKehadiran({...kehadiran, nim: value});
  };
  const onChangeNama = value => {
    setKehadiran({...kehadiran, nama: value});
  };
  const onChangeNik = value => {
    setKehadiran({...kehadiran, nik: value});
  };
  const onChangeNoTelp = value => {
    setKehadiran({...kehadiran, noTelp: value});
  };
  const onChangeKodePos = value => {
    setKehadiran({...kehadiran, kodeposMhs: value});
  };
  const onChangeKodePosOrtu = value => {
    setKehadiran({...kehadiran, kodeposOrtu: value});
  };
  const onChangeEmail = value => {
    setKehadiran({...kehadiran, email: value});
  };

  const validation = () => {
    if (
      gender &&
      valueKelas &&
      value &&
      valueProvinsi &&
      valueKecamatan &&
      valueKota &&
      valueProvinsiOrtu &&
      valueKotaOrtu &&
      valueKecamatanOrtu !== ''
    ) {
      UpdateData();
    } else {
      Alert.alert('Ada Data Yang Belum Diisi', 'Silahkan Diperbaiki', [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
        },
      ]);
    }
  };

  const UpdateData = () => {
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

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(
      `https://project-fadhil-heroku.herokuapp.com/api/mahasiswa/${item._id}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          nim: kehadiran.nim,
          nik: kehadiran.nik,
          nama: kehadiran.nama,
          jenisKelamin: gender,
          id_programStudi: dataProgramStudi,
          id_kelas: dataKelass,
          email: kehadiran.email,
          alamat: kehadiran.alamat,
          noTelp: kehadiran.noTelp,
          alamat: kehadiran.alamat,
          alamatOrtu: kehadiran.alamatOrtu,
          kodeposMhs: kehadiran.kodeposMhs,
          kodeposOrtu: kehadiran.kodeposOrtu,
          provinsiMhs: dataProvinsii.length > 0 ? dataProvinsii[0].nama : '',
          kabupatenMhs: dataKotaa.length > 0 ? dataKotaa[0].nama : '',
          kecamatanMhs: dataKecamatann.length > 0 ? dataKecamatann[0].nama : '',
          provinsiOrtu:
            dataProvinsiOrtuu.length > 0 ? dataProvinsiOrtuu[0].nama : '',
          kabupatenOrtu: dataKotaOrtuu.length > 0 ? dataKotaOrtuu[0].nama : '',
          kecamatanOrtu:
            dataKecamatanOrtuu.length > 0 ? dataKecamatanOrtuu[0].nama : '',
        }),
      },
    )
      .then(response => {
        response.text();
        navigation.goBack();
        console.log(response);
      })
      .then(result => console.log(result))
      .catch(error => console.log(error));
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

  const deleteData = () => {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    fetch(
      `https://project-fadhil-heroku.herokuapp.com/api/mahasiswa/${item._id}`,
      {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify({
          nim: kehadiran.nim,
          nama: kehadiran.nama,
          email: kehadiran.email,
          nik: kehadiran.nik,
          noTelp: kehadiran.noTelp,
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

  useEffect(() => {
    getKelas();
  }, [getKelas]);

  useEffect(() => {
    apiProvinsi();
  }, [apiProvinsi]);

  useEffect(() => {
    getProgramStudi();
  }, [getProgramStudi]);

  useEffect(() => {
    apiProvinsiOrtu();
  }, [apiProvinsiOrtu]);

  const pickerRef = useRef();

  function openKelas() {
    pickerRef.current.focus();
  }

  function closeKelas() {
    pickerRef.current.blur();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 10,
          }}>
          Nim
        </Text>
        <TextInput
          value={kehadiran.nim}
          onChangeText={value => onChangeNim(value)}
          style={styles.input}
          placeholderTextColor="#999999"
          placeholder={kehadiran.nim}
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
          value={kehadiran.nama}
          onChangeText={value => onChangeNama(value)}
          placeholderTextColor="#999999"
          placeholder={kehadiran.nama}
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
            backgroundColor: 'grey',
            marginHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
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
          value={kehadiran.nik}
          placeholderTextColor="#999999"
          placeholder={kehadiran.nik}
          onChangeText={value => onChangeNik(value)}
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
          value={kehadiran.email}
          onChangeText={value => onChangeEmail(value)}
          placeholderTextColor="#999999"
          placeholder={kehadiran.email}
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
              value={kehadiran.kodeposMhs}
              placeholderTextColor="#999999"
              placeholder={'Kode Pos'}
              style={styles.input2}
              onChangeText={value => onChangeKodePos(value)}
            />
          </View>
        </View>
        <TextInput
          value={kehadiran.alamat}
          placeholderTextColor="#999999"
          placeholder={'Alamat Lengkap'}
          onChangeText={value => onChangeAlamat(value)}
          style={styles.input}
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
          value={kehadiran.noTelp}
          placeholderTextColor="#999999"
          placeholder={'No Telepon Mahasiswa'}
          onChangeText={value => onChangeNoTelp(value)}
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
              value={kehadiran.kodeposOrtu}
              placeholderTextColor="#999999"
              placeholder={'Kode Pos'}
              style={styles.input2}
              onChangeText={value => onChangeKodePosOrtu(value)}
            />
          </View>
        </View>
        <TextInput
          value={kehadiran.alamatOrtu}
          placeholderTextColor="#999999"
          placeholder={'Alamat Lengkap'}
          onChangeText={value => onChangeAlamatOrtu(value)}
          style={styles.input}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
          }}>
          <TouchableOpacity style={styles.updateButton} onPress={validation}>
            <View style={{padding: 10}}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Perbarui
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={displayAlert}>
            <View style={{padding: 10}}>
              <Text style={{color: 'red', textAlign: 'center'}}>Hapus</Text>
            </View>
          </TouchableOpacity>
        </View>
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
});
export default DetailMahasiswa;
