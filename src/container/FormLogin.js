import React, {useEffect} from "react";
import {View, Text, TouchableOpacity, Button} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import CostumTextInput from '../components/CostumTextInput';
import navigationServices from '../helper/navigationServices';
import Loading from '../components/Loading';
//import console = require("console");
//import { resolve } from "url";
//import { reject } from "assert";

const validateFormik = yup.object().shape({
    email:yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
});

const FormLogin = () => {
    useEffect (()=> {
        console.log("didmount or didupdate FormLogin");
        return () => {
            console.log("unmount FormLogin");
        };
    }, []);

    _doLogin = ({email, password}) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                if(email==="admin@gmail.com" && password ==="123456") {
                    resolve(true);
                }
                else {
                    reject(new Error("Email or Password Invalid"));
                }
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
                .then( async()=> {
                    const userData = {nama:'Administrator', email:values.email}
                    try{
                        await AsyncStorage.setItem("@USER_DATA",JSON.stringify(userData));
                        navigationServices.navigate("DASHBOARD");
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
                            title="LOGIN"
                            onPress={formikProps.handleSubmit}
                        />                        
                    </View>
                    <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                        <TouchableOpacity>
                            <Text
                                style = {{color:"steelblue", fontSize:16, fontStyle:"italic"}}
                            >{'Lupa Password ?'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigationServices.navigate("REGISTER")}>
                            <Text
                                style={{color:"steelblue", fontSize:16, fontStyle:"italic"}}
                                >{'Register'}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Formik>
    );
};

export default FormLogin;