import React, { useContext,useState} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native';

import { Button } from 'react-native-elements';
import colors from '../../assets/colors';
import CustomButton from './CustomButton';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';




const Card = ({ dress, combine }) => {
    console.log("dress geldi",dress)

    const { userToken, userInfo, setIsDressChange, isDressChange } = useContext(AuthContext);
    const [loading, setLoading] = useState(null)


    const deleteDress = async () => {
        setLoading(true)
        const dataForRequest = {
            username: userInfo.email,
            clothesId: dress.clothesId
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.delete("http://10.0.3.2:8080/api/v1/clothes", {
                data: dataForRequest,
                headers: config.headers
            });
            setIsDressChange(!isDressChange)

        } catch (error) {
            console.error(error);
            setLoading(false)

        }
    };

    const imageUrl = dress.url

    loading &&  <ActivityIndicator size="large"/>

    return (
        <>
            {combine ? (
                <View style={styles.container}>
                
                {dress.caps && <Image source={{ uri: dress.caps }} style={styles.combineImage} />  }  
                {dress.sunglasses && <Image source={{ uri: dress.sunglasses }} style={styles.combineImage} />  }  
                {dress.top && <Image source={{ uri: dress.top }} style={styles.combineImage} />  }  
                {dress.jacket && <Image source={{ uri: dress.jacket }} style={styles.combineImage} />  }  
                {dress.handbag && <Image source={{ uri: dress.handbag }} style={styles.combineImage} />  }  
                {dress.bottom && <Image source={{ uri: dress.bottom }} style={styles.combineImage} />  }  
                {dress.shoes && <Image source={{ uri: dress.shoes }} style={styles.combineImage} />  }  
                </View>
            ) : (
                <View style={styles.container}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{dress.color} </Text>
                        <Text style={styles.title}>{dress.clotheType}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={deleteDress}>
                            <Text style={styles.buttonText}>Sil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,

        margin: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        height: 200,
        resizeMode: 'contain',
        width: '100%',
        borderRadius: 5,

    },
    combineImage:{
        height: 100,
        resizeMode: 'contain',
        width: '100%',
        borderRadius: 5,
    },
    title: {
        color: colors.text,
        fontSize: 12,
        fontWeight: 'bold',
        /* padding: 10, */
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: "flex-start"

    },
    button: {
        backgroundColor: colors.orange,
        width: "100%",
        padding: 5,
        paddingTop: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        color: colors.bg,
        fontSize: 15,
        fontWeight: 'bold',
    },
    textContainer: {
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"

    },
    kombinHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 10,
        color: colors.bg_dark
      }
});

export default Card;