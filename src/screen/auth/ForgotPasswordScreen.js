import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
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
        .required()
})

const ForgotPasswordScreen = () =>{
    useEffect (()=> {
        console.log("didmount or didupdate RegisterScreen");
        return () => {
            console.log("unmount RegisterScreen");
        };
    }, []);

    _doSubmit = ({email}) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                firebase.auth().sendPasswordResetEmail(email)
                .then(user => {
                    alert('Please Check Your Email...')
                    resolve (true)                    
                })
                .catch(()=>{
                    reject(new Error("Please enter your email"))
                })
            }, 2000);
        });
    };

    return(
        <Formik
            initialValues = {{
                email:""
            }}
            onSubmit={(values, actions) => {
                _doSubmit({email:values.email})
                .then(()=> {
                    new Promise ((resolve)=>{
                        setTimeout(()=>{
                            resolve (true)
                        })
                    }, 1500)
                    try{
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
                    <View style={{padding:16}}>
                        <Text style={{fontWeight:"bold", fontSize:24, textAlign:'center'}}>Password reset link will be sent to your email</Text>
                    </View>

                    <CostumTextInput
                        label="Email"
                        nameTxtInput="email"
                        keyboardType="email-address"
                        formikProps={formikProps}
                    />
                    {formikProps.isSubmitting && <Loading/>}
                    <View style = {{marginVertical:10}}>                    
                        <Button
                            title="SEND"
                            onPress={formikProps.handleSubmit}                            
                        />                       
                    </View>
                </>
            )}
        </Formik>
    );
}

export default ForgotPasswordScreen;