import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomButton from '../Components/CustomButton';
import colors from '../../assets/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../Components/CustomInput';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native-gesture-handler';
/* import RNFS from 'react-native-fs'; */



const AddDress = () => {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();
  const [isPhotoSended, setIsPhotoSended] = useState(false)
  const [dressName, setDressName] = useState()
  const [colorName, setColorName] = useState()
  const [fireBaseURI, setfireBaseURI] = useState()
  const [loading, setLoading] = useState(null)

  const { userToken, userInfo,setIsDressChange,isDressChange } = useContext(AuthContext)



  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Bi kullanıcı adın yok mu'),
    clothesType: Yup.string().required('Nasıl bir kıyafet bu he'),
    url: Yup.string().required('Url nerde'),
    color: Yup.string().required('Renk gereklidir'),
  });


  const optionsForClothes = [
    { label: 'Pantolon', value: 'PANT' },
    { label: 'Elbise', value: 'DRESS' },
    { label: 'Şapka', value: 'CAPS' },
    { label: 'El Çantası', value: 'HANDBAG' },
    { label: 'Ceket', value: 'JACKET' },
    { label: 'Gömlek', value: 'SHIRT' },
    { label: 'Ayakkabı', value: 'SHOES' },
    { label: 'Şort', value: 'SHORT' },
    { label: 'Etek', value: 'SKIRTS' },
    { label: 'Güneş Gözlüğü', value: 'SUNGLASSES' },
    { label: 'Hırka', value: 'SWEATER' },
    { label: 'Kazak', value: 'SWEATSHIRT' },
    { label: 'Tshirt', value: 'TSHIRT' },
  ];

  const optionsForColors = [
    { label: 'Siyah', value: 'BLACK' },
    { label: 'Beyaz', value: 'WHITE' },
    { label: 'Kırmızı', value: 'RED' },
    { label: 'Lime Yeşili', value: 'LIME' },
    { label: 'Mavi', value: 'BLUE' },
    { label: 'Sarı', value: 'YELLOW' },
    { label: 'Açık Mavi', value: 'CYAN' },
    { label: 'Mor', value: 'MAGENTA' },
    { label: 'Gümüş', value: 'SILVER' },
    { label: 'Gri', value: 'GRAY' },
    { label: 'Vişne Çürüğü', value: 'MAROON' },
    { label: 'Zeytuni', value: 'OLIVE' },
    { label: 'Yeşil', value: 'GREEN' },
  ];


  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setCameraPhoto(result.assets[0].uri);
  };

  const firebasePhoto = async (uri) => {
    setLoading(true)
    const reference = storage().ref(uri);
    try {
      const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
      await reference.putFile(uri);
      const url = await storage().ref(uri).getDownloadURL();
      setfireBaseURI(url)
      const urlForAI = {
        url: url
      };
      const { data } = await axios.post("http://10.0.3.2:8000/api/v1/clothes", urlForAI)
      console.log(data.clothes_type)
      setDressName(data.clothes_type)
      setColorName(data.dominant_color)
      setLoading(false)

      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }




  const addDressToDb = async (values) => {
    try {

      const config = {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
      };
      console.log("values", values)


      const { data } = await axios.post("http://10.0.3.2:8080/api/v1/clothes", values, config)
      setIsDressChange(!isDressChange)
      Alert.alert("Kıyafet Eklendi");
      console.log(data);
    } catch (error) {
      console.log(error.message)
    }

  }

  return (

    <View style={styles.container}>

      <View style={styles.buttons}>
        <CustomButton onPress={openCamera} iconName="" title={"Fotoğraf Çek"} />
        <CustomButton onPress={openGallery} title={"Galeriden Seç"} />
      </View>

      {cameraPhoto &&
        <>
          <Image style={styles.imageStyle} source={{ uri: cameraPhoto }} />
          <CustomButton onPress={() => firebasePhoto(cameraPhoto)} title={"Fotoğrafı Gönder"} />
        </>
      }
      {galleryPhoto && <>
        <Image style={styles.imageStyle} source={{ uri: galleryPhoto }} />
        <CustomButton onPress={() => firebasePhoto(galleryPhoto)} title={"Fotoğrafı Gönder"} />
      </>


      }

      {loading ? <ActivityIndicator style={{ alignItems: "center", justifyContent: "center" }} size="large" /> : dressName && colorName &&
        

          <Formik
            initialValues={{ username: userInfo.email, clothesType: dressName, url: fireBaseURI, color: colorName }}
            onSubmit={(values) => addDressToDb(values)}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <Text style={styles.contentText}>Kıyafetinizi analiz ettik yapay zekamız çok zeki değil ,yanlış analiz etmiş olabilir değerlerde bir yanlışlık olduğunu düşünüyorsan değiştirmeni rica edicez</Text>
                <Picker style={styles.picker}
                  selectedValue={values.clothesType}
                  onValueChange={handleChange('clothesType')}
                >
                  {optionsForClothes.map(option => (
                    <Picker.Item
                     
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>

                <Picker style={styles.picker}
                  selectedValue={values.color}
                  onValueChange={handleChange('color')}
                >
                  {optionsForColors.map(option => (
                    <Picker.Item
                     
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>



                <CustomButton
                  title='Kıyafeti Ekle'
                  onPress={handleSubmit}
                  iconName="login"
                />

              </>
            )}
          </Formik>}
        
      </View>


  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    height: 250,
    width: 250,
    marginTop: 20,
    borderRadius: 5,
    resizeMode:"contain"
  },
  picker: {
    height: 40,
    width: 300,
    margin: 5,
    backgroundColor: colors.low_green,
  },
  contentText: {
    color: colors.bg_dark,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    width: 400,
  },
  pickerItem: {
    color: colors.text,
    backgroundColor: "red"
  }
});

export default AddDress;