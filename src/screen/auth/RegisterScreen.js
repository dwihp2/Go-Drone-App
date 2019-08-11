import React, {Component} from 'react';
import { View, Text, Stylesheet, Button } from 'react-native';
import { styles } from '../../styles';
import navigationServices from '../../helper/navigationServices';
import Firebase from '../../helper/Firebase_Config';
import {FormLabel, FormInput} from 'react-native-elements';

export default class RegisterScreen extends Component {
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
        Firebase.auth().createUserWithEmailAndPassword(email,password)
        // .then (() =>{
        //     this.setState({error:'', loading:false})
        //     navigationServices.navigate('AUTH')
        // })
        // .catch(()=> {
        //     thi.setState({error:'Authentication Failed', loading:false})
        // })
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
            <View style = {{flex:1}}>
                {/* <FormLabel>Email</FormLabel> */}
                {/* <FormInput
                    value = {this.state.email}
                    onChangeText = {email => this.setState({email})}
                    placeholder = 'Email'
                />

                <FormLabel>Password</FormLabel>
                <FormInput
                    value = {this.state.password}
                    onChangeText = {password => this.setState({password})}
                    placeholder = 'Password'
                /> */}
                <Text>{this.state.error}</Text>
                {/* {this.renderButtonOrLoading()} */}
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


