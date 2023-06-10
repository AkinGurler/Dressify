import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useContext, useState } from 'react'
import CustomButton from '../Components/CustomButton';
import colors from '../../assets/colors';
import Card from '../Components/Card';
import useFetch from '../hooks/useFetch';
import RenderDress from '../Components/RenderDress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import usePost from '../hooks/usePost';





const Profile = ({ navigation }) => {
  /*  const { data, err, loading, fetchData } = useFetch(); */
  const { logout, userInfo, userToken,isDressChange } = useContext(AuthContext)
  const [clothes, setClothes] = useState(null)

  const { data, err, loading, postData } = usePost()

  /* 
    const getAllClothes = async () => {
      
      try {
        const usernameForRequest = {
          "username": userInfo.email
        }
        console.log(usernameForRequest)
        var config = {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
        };
        const { data } = await axios.post("http://10.0.3.2:8080/api/v1/clothes/getAll", usernameForRequest, config)
        console.log(data.clothes)
        setClothes(data.clothes)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }
    } */


  useEffect(() => {
    const usernameForRequest = {
      username: userInfo.email
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
    };
    postData("http://10.0.3.2:8080/api/v1/clothes/getAll", usernameForRequest, config)
    /* getAllClothes(); */
  }, [isDressChange]);

  console.log(data)

  return (

    <SafeAreaView style={styles.container} >

      <ScrollView>


        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
          <Text style={styles.name}>{userInfo.firstname} {userInfo.lastname} </Text>
          <Text style={styles.email}>{userInfo.email}</Text>
          <View style={styles.btn_container}>
            <CustomButton
              title="Çıkış Yap"
              onPress={() => logout()}
            />
            <CustomButton
              title="Kıyafet Ekle"
              onPress={() => navigation.navigate("Kıyafet Ekle")}
            />
          </View>
        </View>


        <Text style={styles.dolapHeader}>Dolabım</Text>

        {loading ? <ActivityIndicator style={{ alignItems: "center", justifyContent: "center" }} size="large" />
          : err ? <Text>{err}</Text> :
            <View style={styles.renderContainer}>
              <RenderDress data={data.clothes} />
            </View>}






      </ScrollView>

    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    backgroundColor: colors.low_green,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    margin: 10,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    margin: 15,
    textAlign: "center",
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    color: colors.text,
    fontSize: 16,
  },
  body: {
    padding: 20,
    backgroundColor: colors.bg
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '45%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  userInfo: {

    flexDirection: 'row',
    marginVertical: 5,
  },
  userInfoText: {
    color: colors.white,
    marginLeft: 10,
    fontSize: 16,

  },
  btn_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  dolap_container: {
    backgroundColor: "red",
    flex: 1,
  },
  renderContainer: {

  },
  dolapHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.bg_dark
  }
});