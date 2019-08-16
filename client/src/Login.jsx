import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.data.type === 'error') {
                this.setState({
                    message: res.data.message
                })
            }   else {
                localStorage.setItem('mernToken', res.data.token)
                this.props.liftToken(res.data)
            }
        }).catch(err => {
            this.setState({
                message: "Max login attempts exceeded. Please try again later."
            })
        })
    }

    render() {
        return (
            <div className="Login">
                <h3>Log into your account:</h3>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        onChange={this.handleEmailChange} 
                        value={this.state.email}
                        name="email"
                        type="email"
                        placeholder="enter your email"
                        />
                    <input 
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                        type="password"
                        name="password"
                        placeholder="enter your password"
                        />
                    <input 
                        type="submit" 
                        value="Log in!" />
                </form>
            </div>
        );
    }
}

export default Login;