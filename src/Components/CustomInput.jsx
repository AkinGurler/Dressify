import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Input, View } from 'react-native-elements';
import colors from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({ placeholder, iconName, onChangeText, onBlur, value, errorMessage, secure }) => {
    return (
        <>
            {secure ?
                <Input
                    placeholder={placeholder}
                    leftIcon={<Icon style={styles.icon}
                        name={iconName}
                        size={24}
                        color={'white'}
                    />}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errorMessage}
                    inputStyle={styles.text}
                    inputContainerStyle={styles.input}
                    secureTextEntry
                />
                :
                <Input
                    placeholder={placeholder}
                    leftIcon={<Icon style={styles.icon}
                        name={iconName}
                        size={24}
                        color={'white'}
                    />}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errorMessage}
                    inputStyle={styles.text}
                    inputContainerStyle={styles.input}
                />
            }

        </>
    );
};


const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.low_green,
        padding: 3,
    },
    text: {
        color: colors.white,
        fontSize: 16,
    },
    icon: {
        
    }
})

export default CustomInput;


