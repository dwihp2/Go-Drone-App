import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import navigationServices from '../../helper/navigationServices';
import { styles } from '../../styles';

const ProfileScreen = () => {
    const [dataUser, setDataUser] = useState({});

    useEffect (() => {
        _getDataUser();
    },[]);

    const _getDataUser = async () => {
        try {
            let _dataUser = await AsyncStorage.getItem("@USER_DATA");
            setDataUser(JSON.parse (_dataUser));
        }
        catch (e) {
            alert(e);
        }
    };

    const _logOut = async () => {
        try {
            await AsyncStorage.removeItem("@USER_DATA");
        }
        catch (e) {
            alert (e);
        }
        navigationServices.navigate("AUTH");
    };

    return (
        <View style = {styles.container}>
            <Text ProfileScreen></Text>
            {dataUser["nama"] && (
                <>
                    <Text style = {{fontSize:28}}>{dataUser ["nama"]}</Text>
                    <Text style = {{fontSize:28,marginBottom:30}}>{dataUser ["email"]}</Text>
                </>    
            )}
            <Button onPress={_logOut} title="LOGOUT" />
        </View>
    );
};

export default ProfileScreen;