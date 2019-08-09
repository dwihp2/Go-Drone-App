import React from 'react';
import { View, Text, Stylesheet } from 'react-native';
import { styles } from '../../styles';
import navigationServices from '../helper/navigationServices';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';
import {FormLabel, FormInput} from 'react-native-elements';

firebase.initializeApp({
    apiKey: "AIzaSyDGsFlxF2OGb3Wk065n-MYXRl4GNKu6NhU",
    authDomain: "go-drone-app-1555832629237.firebaseapp.com",
    databaseURL: "https://go-drone-app-1555832629237.firebaseio.com",
    projectId: "go-drone-app-1555832629237",
    storageBucket: "",
    messagingSenderId: "421705696625",
    appId: "1:421705696625:web:e3c038c46e7934fc"
})

export default class RegisterScreen extends Components {
    constructor (props){
        super(props);
        this.state = {
            email:'',
            password:'',
            error:'',
            loading:false,
        };
    }

    onSignUpPress() {
        this.setState({
            error:'', 
            loading:true
        });

        const {email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then (() =>{
            this.setState({error:'', loading:false})
            navigationServices.navigate('AUTH')
        })
        .catch(()=> {
            thi.setState({error:'Authentication Failed', loading:false})
        })
    };

    renderButtonOrLoading(){
        if (this.state.loading){
            return <Text>Loading</Text>
        }
        return (
            <View>                
                <Button
                    onPress = {this.onSignUpPress.bind(this)}
                    title = 'Sign Up'
                />        
            </View>
        ) 
    }

    render () {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput
                    value = {this.state.email}
                    onChangeText = {email => this.setState({email})}
                    placeholder = 'Email'
                />

                <FormLabel>Password</FormLabel>
                <FormInput
                    value = {this.state.password}
                    onChangeText = {password => this.setState({password})}
                    placeholder = 'Password'
                />
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}




// const RegisterScreen = (props) => (
//     <View style = {styles.container}>
//         <Text>RegisterScreen</Text>
//     </View>
// )
// export default RegisterScreen;


