import Router from "next/router";
import fetch from 'isomorphic-unfetch';
import { WhiteSpace } from "antd-mobile";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            registerStatus: 2,
            registerResult: 0
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
    };

    async componentDidMount() {
        const res = await fetch("http://127.0.0.1:8081/api/login", {
            method: "GET",
            credentials: 'include',
            mode: 'cors'
        })
        const json = await res.json()
        console.log(json)
        if (json.data.status == '1') {
            Router.push('/error', '/')
        }
    }


    async handleRegister() {
        if (this.state.userName.length < 6 || this.state.password < 6) {
            this.setState({ registerResult: 2 })
            return;
        }
        var data = { 'userName': this.state.userName, 'password': this.state.password }
        console.log(JSON.stringify(data))
        fetch("http://127.0.0.1:8081/api/register", {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: "include",
            mode: 'cors',
            headers: {
                "content-type": "application/json"
            }
        }).then((res) => res.json())
            .then((result) => {
                this.setState({
                    registerStatus: result.data.status
                })
            })
        event.preventDefault();
    }

    handleUserNameChange(event) {
        this.setState({ userName: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    handleRegisterResult() {
        switch (this.state.registerResult) {
            case 0:
                return (<WhiteSpace />)
            case 1:
                return (<label>用户名已存在</label>)
            case 2:
                return (<label>用户名与密码至少6个字符长</label>)
        }
    }

    render() {
        if (this.state.registerStatus == '0') {
            Router.push('/error', '/')
        }
        else if (this.state.registerStatus == '1') {
            this.state.registerStatus = 2;
            this.setState({ registerResult: 1 })
        }

        return (
            <div>
                <div className="flex-container">
                    <div className="form-content">
                        <h2>注 册</h2>
                        <form onSubmit={this.handleRegister}>
                            <input type="text" value={this.state.userName} onChange={this.handleUserNameChange} placeholder="用户名" />
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="密码" />
                            <input type="submit" value="注 册" />
                        </form>
                        {this.handleRegisterResult()}
                        <WhiteSpace />
                        <div className="form-footer">
                            <a className="underline-hover" onClick={() => Router.push('/login')}>已有帐户</a>
                        </div>
                    </div>

                </div>
                <style jsx global>{`
                    html {
                        background-color: #56baed;
                    } 
                    body {
                        height: 100vh;
                    }
                `}</style>
                <style jsx>{`
                    h2 {
                        text-align: center;
                        font-size: 25px;
                        font-weight: 600;
                        margin: 40px 8px 10px 8px;
                        color: #00000;
                    }
                    label {
                        font-color: red;
                    }
                    a {
                        color: #92badd;
                        display: inline-block;
                        text-decoration: none;
                        font-weight: 400;
                    }
                    .flex-container {
                        display: flex; 
                        flex-direction: column; 
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        min-height: 100%;
                        padding-top: 50px;
                    } 
                    .form-content {
                        -webkit-border-radius: 10px 10px 10px 10px;
                        border-radius: 10px 10px 10px 10px;
                        width: 90%;
                        max-width: 450px;
                        position: relative;
                        -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
                        box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
                        height: 30%;
                        background: #fff;
                        text-align: center;
                    }
                    .form-footer {
                        background-color: #f6f6f6;
                        border-top: 1px solid #dce8f1;
                        padding: 25px;
                        text-align: center;
                        -webkit-border-radius: 0 0 10px 10px;
                        border-radius: 0 0 10px 10px;
                    }
                    input[type=submit] {
                        background-color: #56baed;
                        border: none;
                        color: white;
                        padding: 15px 80px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 13px;
                        -webkit-box-shadow:  0 10px 30px 0 rgba(95,186,233,0.4);
                        box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
                        -webkit-border-radius: 5px 5px 5px 5px;
                        border-radius: 5px 5px 5px 5px;
                        margin: 10px 20px 20px 20px;
                    }
                    input[type=text], input[type=password] {
                        background-color: #f6f6f6;
                        border: none;
                        color:#0d0d0d;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 5px;
                        width: 70%;
                        border: 2px solid #f6f6f6;
                    }
                    .underline-hover:after {
                        display: block;
                        left: 0;
                        bottom: -10px;
                        width: 0;
                        height: 2px;
                        background-color: #56baed;
                        content: "";
                        transition: width 0.2s;
                    }
                    .underline-hover:hover {
                        color: #0d0d0d;
                    }
                    .underline-hover:hover:after {
                        width: 100%
                    }

                `}</style>
            </div>
        );
    };

};

export default Register

