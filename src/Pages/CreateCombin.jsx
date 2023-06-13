import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image, Dimensions, TextInput, Button, PermissionsAndroid,ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import colors from '../../assets/colors';
import Geolocation from 'react-native-geolocation-service';
import { SelectList } from 'react-native-dropdown-select-list'
import CustomButton from '../Components/CustomButton';

import useFetch from '../hooks/useFetch';
import axios from 'axios';
import usePost from '../hooks/usePost';
import { AuthContext } from '../Context/AuthContext';
import RenderDress from '../Components/RenderDress';
import { ScrollView } from 'react-native-gesture-handler';

const datas = [
  {
    key: 'Option 1',
    value: 'option1',
  },
  {
    key: 'Option 2',
    value: 'option2',
  },
  {
    key: 'Option 3',
    value: 'option3',
  },
];





const CreateCombin = () => {
  const [selectedItems, setSelectedItems] = useState("");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null)

  const { userInfo, userToken } = useContext(AuthContext);
  const { data, err, loading, fetchData } = useFetch()
  const { data: combineData, err: combineErr, loading: combineLoading, postData } = usePost()


  const onSubmit = () => {
    // request gönderme işlemi burada yapılabilir
    /*  console.log('Selected Items:', selectedItems); */
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log("set çalişti", position.coords)
            setLocation(position.coords);
          },
          error => {

            console.log("location alırken error", error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log("sonconsoleş.log", location);

  };
  const getCombinedDresses = () => {
    fetchData("https://www.themealdb.com/api/json/v1/1/categories.php")
  }


  useEffect(() => {
    getLocation()
  }, []);

  useEffect(() => {
    if (location) {
      fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=2073e8809a182e3af6853c1fd2fe955b&units=metric&lang=tr`)
    }

  }, [location])

  if (loading) {
    return (
      <ActivityIndicator style={{ alignItems: "center", justifyContent: "center" }} size="large" />
    )
  }


  const weatherDesc = data.weather[0].description;
  const temp = data.main.temp

  const sendWeather = async () => {
    let sendData;
    console.log("sendWeather çaişti")
    console.log("gelen weather", weatherDesc)
    if (weatherDesc === "parçalı bulutlu" || weatherDesc === "açık hava" || "parçalı az bulutlu") {
      console.log("SUMMER")
      sendData = "SUMMER"
    } else {
      sendData = "WINTER"
    }
    console.log("mevsim", sendData)
    const dataForRequest = {
      weather: sendData,
      username: userInfo.email
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    }

    postData("http://10.0.3.2:8080/api/v1/combine/makeCombine", dataForRequest, config)
  }


  console.log(combineData)
  return (
    <ScrollView>

      <View style={styles.container}>
        {/* <Button title="Get Location" onPress={getWeather} />
      <Button title="Get Weather" onPress={() => getWeatherFromApi(location.latitude,location.longitude)} /> */}

        <View style={styles.optionsContainer}>
          <Text style={styles.title}>Kombin Oluştur </Text>
         {/*  <SelectList data={datas} setSelected={setSelectedItems}
            boxStyles={{ backgroundColor: colors.orange }}
            dropdownStyles={{ backgroundColor: colors.orange }}
            dropdownTextStyles={{ color: colors.white }}
            placeholder='Nereye Gideceksin ?'
          />
         */}


          <Text style={styles.weatherContainer} >Hava Durumu :{weatherDesc} / {temp}° </Text>

        </View>
        <View style={styles.submitButton}>
          <CustomButton
            onPress={() => sendWeather()}
            title="Gönder"
          />
        </View>
        <Text style={styles.combineHeader} >Kombinler</Text>
        {combineLoading ? <ActivityIndicator style={{ alignItems: "center", justifyContent: "center" }} size="large" />
          : combineErr ? <Text>{combineErr}</Text> :
            <View style={styles.renderContainer}>
              <RenderDress data={combineData.combineList} combine={true} />
            </View>}
      </View>
    </ScrollView>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg

  },
  title: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    color: '#FFF',
    fontSize: 18,
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
  },
  searchIcon: {
    padding: 10,
  },
  searchText: {
    color: '#FFF',
    fontSize: 18,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#2980b9',
    fontSize: 18,
  },
  image: {
    resizeMode: "contain",
    alignItems: "center",
    width: Dimensions.get('window').width / 1.1,
    height: 300,
  },
  optionsContainer: {
    margin: 10,
    gap: 10,

  },
  submitButton: {
    alignItems: "center"
  },
  weatherContainer: {
    backgroundColor: colors.orange,
    padding: 14,
    borderRadius: 10,
  },
  combineHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.bg_dark
  }
});

export default CreateCombin;