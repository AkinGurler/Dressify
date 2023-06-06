import React, { useState,useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text, Image } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../Components/CustomButton';
import CustomInput from '../Components/CustomInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePost from '../hooks/usePost';
import { AuthContext } from '../Context/AuthContext';


/* email('Geçerli bir e-posta adresi girin') */

const validationSchema = Yup.object().shape({
  email: Yup.string().required('E-posta adresi gereklidir'),
  password: Yup.string().required('Şifre gereklidir'),
});

const LoginPage = ({navigation,route}) => {
  const {login} = useContext(AuthContext)
  
  const {data, err, loading, postData }=usePost();

  const [isRegistered, setIsRegistered] = useState(true)

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values=>login(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <CustomInput
              placeholder='E-posta adresi'
              iconName={"account"}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email}
            />
            <CustomInput
              placeholder='Şifre'
              iconName="lock"
              secure={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorMessage={touched.password && errors.password}
            />
            <CustomButton
              loading={loading}
              title='Giriş yap'
              onPress={handleSubmit}
              iconName="login"
            />
            <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
            <Text style={styles.footer}>Hesabınız yok mu?
             <Text style={styles.link}>Kayıt ol</Text>
             </Text>
            </TouchableOpacity>
            
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#576359',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#DFB064',
    marginTop: 20,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
  link: {
    color: '#DFB064',
  },
});

export default LoginPage;