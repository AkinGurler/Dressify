import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useContext } from 'react'
import colors from '../../assets/colors';
import CustomButton from '../Components/CustomButton';
import { AuthContext } from '../Context/AuthContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from 'react-native-elements/dist/helpers';


const HomePage = ({ navigation }) => {

  const { text } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      {/* <ImageBackground
      style={styles.background}
      source={require("../../assets/logo.png")}
    > */}

      <View style={styles.contentContainer}>

        <Image
          style={styles.image}
          source={require("../../assets/logo.png")} />
        <Text style={styles.contentTitle}>Hoş Geldiniz!</Text>
        <Text style={styles.contentText}>
          Dolabım sekmesinden yeni kıyafetler ekleyebilir ve Eklediğin kıyafetlerle güzel bir kombin oluşturabilirsin.
        </Text>
        <CustomButton
          title={"Kombin Oluştur"}
          onPress={() => navigation.navigate("KombinOluştur")}
          iconName="hanger"
        />


      </View >
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.profilIcon} onPress={() => navigation.navigate("Profile")} >
          <Icon name='account-tie' size={30} color={colors.orange} />
          <Text style={styles.menuText}>Profil</Text>
        </TouchableOpacity>

        <View style={styles.profilIcon}>
          <Icon name='home-variant' size={30} color={colors.orange} />
          <Text style={styles.headerText}>Ana Sayfa</Text>
        </View>

        <TouchableOpacity style={styles.profilIcon} onPress={() => navigation.navigate("Profile")}>
          <Icon name='file-cabinet' size={30} color={colors.orange} />
          <Text style={styles.searchText}>Dolabım</Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent:"space-between"
    
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
 /*  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  }, */
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  profilIcon: {
    padding: 10,
    alignItems: "center"
  },
  menuText: {
    color: colors.text,
    fontSize: 10,
  },
  headerText: {
    color: colors.text,
    fontSize: 15,
  },
  searchIcon: {
    padding: 10,
  },
  searchText: {
    color: colors.text,
    fontSize: 10,
  },
  contentContainer: {
    marginTop:50,
    margin:10,
    backgroundColor:colors.low_green,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical:15,
    
  },
  contentText: {
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.text,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
  },
  image: {
    resizeMode: "contain",
    alignItems: "center",
    width: Dimensions.get('window').width / 1.1,
    height: 250,
  },
});