import React from 'react';
import User from '../../assets/user.svg';
import Lock from '../../assets/lock.svg';
import { createUser } from '../../assets/mock';
import './LoginForm.scss';

class LoginForm extends React.Component{
    constructor(props){
        super(props)

            this.state ={
                user: {
                    email: '', 
                    password: ''
                },
                message: '',
                mailError: ''
            }
    }

    onChangeEmail = (p) => {
        this.setState({
            user:{
                ...this.state.user,
                email: p.target.value
            }
        });

    }

    onChangePassword = (p) => {
        this.setState({
            user:{
                ...this.state.user,
                password: p.target.value
            }
        });
    }

    handleLocalStorage = () => {

        const { email, password } = this.state.user;

        if(localStorage.getItem('email') === null && localStorage.getItem('password') === null){
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        alert('You are signed in!');
        }else{
            alert('You are already signed in!');
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        const validEmail = this.state.user.email;

        const { email, password } = this.state.user;

        if(validEmail !== '' && this.state.user.password !== ''){
            if(regex.exec(validEmail)){
                    try {
                        await createUser({email, password});
                        this.handleLocalStorage();
                        
                    }catch(error){
                        return null;
                    }
                
            }else{
                this.setState({
                    ...this.state,
                    mailError: 'Email is Invalid'
                });
            }
        }else{
            this.setState({
                ...this.state,
                message: 'Please, fill the fields!'
            });
        }
    }
    

    showMessage = () => {
        if (this.state.message !== ''){
            return <span style={{ color: 'red', position: 'absolute'}}>{this.state.message}</span>;
        }else if(this.state.mailError !== ''){
            return <span style={{ color: 'red', position: 'absolute'}}>{this.state.mailError}</span>;
        }else{
            return null;
        }
    }


    render(){
        return(
            <div className='login-container'>
                <div className='login-container--heading'>
                    <h4>Login Form</h4>
                </div>
                <div className='login-container--input'>
                    {this.showMessage()}
                    <img className="login-container--input-user" src={User} alt="user"/>
                    <img className="login-container--input-lock" src={Lock} alt="lock"/>
                    <input placeholder="E-mail" 
                            type='email' 
                            value={this.state.user.email}
                            onChange={this.onChangeEmail}/>
                    <input 
                            placeholder="Password" 
                            type='password' 
                            value={this.state.user.password}
                            onChange={this.onChangePassword}/>
                    <div className='login-container--input--button'>
                        <button type='submit' onClick={(event) => this.handleSubmit(event)}>Sign In</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default LoginForm;