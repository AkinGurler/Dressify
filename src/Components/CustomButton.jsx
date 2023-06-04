import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from '../../assets/colors';

const CustomButton = ({ title, onPress, loading, iconName,propWidth }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} disabled={loading}>
      {loading ? <ActivityIndicator />
        :
        <View style={styles.inContainer}>
         
            {iconName && <Icon name={iconName} size={25} color={colors.bg} />}
          <Text style={styles.text}>{title}</Text>
        </View>
      }
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    width:"45%" ,
    backgroundColor: '#DFB064',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  inContainer:{
    flexDirection:"row",
    alignItems:"center",
    gap:5,
  },
};

export default CustomButton;