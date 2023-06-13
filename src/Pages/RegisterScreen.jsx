import React, { useContext } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { AuthContext } from '../Context/AuthContext';

const validationSchema = yup.object().shape({
    firstname: yup.string().required("İsimsiz Kullanıcı Olmaz"),
    lastname: yup.string().required("Soyisimsiz Kullanıcı Olmaz"),
    email: yup.string().required("Sene 2023 Bir Mail Adresin olmalı"),
    password: yup.string().required("Diğer Hesaplarından farklı ve Aklında tutabileceğin bir şifre koyman lazım biliyorum zor"),
});



const RegisterScreen = () => {
    const { register, loading } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />

            <Formik
                initialValues={{ firstname: '', lastname: "", email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={values => register(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <CustomInput
                            iconName="account"
                            placeholder="First Name"
                            onChangeText={handleChange('firstname')}
                            onBlur={handleBlur('firstname')}
                            value={values.firstname}
                            errorMessage={touched.firstname && errors.firstname}
                        />
                        <CustomInput
                            iconName="account"
                            placeholder="Last Name"
                            onChangeText={handleChange('lastname')}
                            onBlur={handleBlur('lastname')}
                            value={values.lastname}
                            errorMessage={touched.lastname && errors.lastname}
                        />

                        <CustomInput
                            iconName="email"
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            errorMessage={touched.email && errors.email}

                        />

                        <CustomInput
                            placeholder="Password"
                            iconName="lock"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            errorMessage={touched.password && errors.password}
                        />

                        <CustomButton

                            title='Kayıt Ol'
                            onPress={handleSubmit}
                            iconName="login"
                        />


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


    buttonContainer: {
        width: 500,
        alignItems: "center"
    }
});

export default RegisterScreen;