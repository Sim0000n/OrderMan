import Router from "next/router";
import fetch from 'isomorphic-unfetch';
import { WhiteSpace, Modal } from "antd-mobile";
import '../../public/css/login.css'

const alert = Modal.alert;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerId: '',
            password: '',
            loginStatus: 0,
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlesellerIdChange = this.handlesellerIdChange.bind(this);
    };

    async handleLogin() {
        var data = { 'sellerId': this.state.sellerId, 'password': this.state.password }
        console.log(JSON.stringify(data))
        fetch("http://localhost:8081/api/seller/login", {
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
                    sellerId: result.data.sellerId,
                    loginStatus: result.data.status
                })
            })
        event.preventDefault();
    }

    handlesellerIdChange(event) {
        this.setState({ sellerId: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    async componentDidMount() {
        const res = await fetch("http://localhost:8081/api/seller/login", {
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

    render() {
        switch (this.state.loginStatus) {
            case 1:
                Router.push('/error', '/seller');
                break;
            case 2:
                alert('登录失败', '用户名不存在，请重新输入', [
                    { text: 'Ok', onPress: () => console.log('sellerId not exist')}
                ]);
                this.setState({loginStatus: 0, password: '', sellerId:''});
                break;
            case 3:
                alert('登录失败', '密码错误，请重新输入', [
                    { text: 'Ok', onPress: () => console.log('password not correct')}
                ])
                this.setState({loginStatus: 0, password: '', sellerId:''});
                break;
            default:
                break;
        }

        return (
            <div>
                <div className="flex-container">
                    <div className="form-content">
                        <h2>登 录</h2>
                        <form onSubmit={this.handleLogin}>
                            <input type="text" value={this.state.sellerId} onChange={this.handlesellerIdChange} placeholder="用户名" />
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="密码" />
                            <input type="submit" value="登 录" />
                        </form>
                        <WhiteSpace />
                        <div className="form-footer">
                            <a className="underline-hover" onClick={() => Router.push('/seller/register')}>加入我们</a>
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
            </div>
        );
    };

};

export default Login;
