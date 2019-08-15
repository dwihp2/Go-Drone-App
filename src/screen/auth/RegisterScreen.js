import React, {useEffect, useState} from 'react';
import { View, Text, Stylesheet, Button, RefreshControl } from 'react-native';
import { styles } from '../../styles';
import navigationServices from '../../helper/navigationServices';
import firebase from '../../helper/Firebase_Config';
import {Formik} from 'formik';
import * as yup from 'yup';
import CostumTextInput from '../../components/CostumTextInput';
import Loading from '../../components/Loading';

const validateFormik = yup.object().shape({
    email:yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
        .min(6)
});

const RegisterScreen = () => {
    useEffect (()=> {
        console.log("didmount or didupdate RegisterScreen");
        return () => {
            console.log("unmount RegisterScreen");
        };
    }, []);
    
    _doLogin = ({email, password}) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.warn(user);
                    resolve (true)                    
                })
                .catch((error)=>{
                    alert(error)
                    reject (true)
                })
            }, 2000);
        });
    };
    
    return(
        <Formik
            initialValues = {{
                email:"",
                password:""
            }}
            onSubmit={(values, actions) => {
                _doLogin({email:values.email, password:values.password})
                .then(()=> {
                    const userData = {email:values.email}
                    new Promise ((resolve)=>{
                        setTimeout(()=>{
                            console.warn(values.password)
                            resolve (true)
                        })
                    }, 1500)
                    try{
                        // await AsyncStorage.setItem("@EMAIL",JSON.stringify(userData));
                        navigationServices.navigate("LOGIN");
                    }catch(e) {
                        alert(e)
                    }
                })
                .catch(e => (e.message))
                .finally(()=> actions.setSubmitting(false));
            }}
            validationSchema={validateFormik}
        >
            {formikProps => (
                <>
                    <CostumTextInput
                        label="Email"
                        nameTxtInput="email"
                        keyboardType="email-address"
                        formikProps={formikProps}
                    />
                    <CostumTextInput
                        label="Password"
                        nameTxtInput="password"
                        secureTextEntry
                        formikProps={formikProps}
                    />

                    {formikProps.isSubmitting && <Loading/>}
                    <View style = {{marginVertical:10}}>                    
                        <Button
                            title="SIGN UP"
                            onPress={formikProps.handleSubmit}                            
                        />                       
                    </View>
                </>
            )}
        </Formik>
    );
};

export default RegisterScreen;


