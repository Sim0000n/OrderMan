import Router from "next/router";
import fetch from 'isomorphic-unfetch';
import { WhiteSpace, Modal } from "antd-mobile";
import '../../public/css/login.css'
const alert = Modal.alert;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerId: '',
            sellerName: '',
            password: '',
            password2: '',
            registerStatus: 2,
            registerResult: 0
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSellerIdChange = this.handleSellerIdChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleSellerNameChange = this.handleSellerNameChange.bind(this)
    };

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


    handleRegister() {
        console.log('submit')
        if (this.state.sellerId.length < 6 || this.state.password.length < 6) {
            this.setState({ registerResult: 2, sellerId: '', password: '', password2: '' })
        } else if (this.state.password2 !== this.state.password) {
            this.setState({ registerResult: 3, sellerId: '', password: '', password2: '' })
        } else if(this.state.sellerName.length == 0) {
            this.setState({ registerResult: 4 })
        } else {
            console.log("register")
            this.register();
        }
        event.preventDefault();
    }

    async register() {
        var data = { 
            'sellerId': this.state.sellerId, 
            'password': this.state.password, 
            'sellerName': this.state.sellerName }
        console.log(JSON.stringify(data))
        fetch("http://localhost:8081/api/seller/register", {
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

    handleSellerIdChange(event) {
        this.setState({ sellerId: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    handlePassword2Change(event) {
        this.setState({ password2: event.target.value })
    }

    handleSellerNameChange(event) {
        this.setState({ sellerName: event.target.value })
    }

    handleRegisterResult() {
        switch (this.state.registerResult) {
            case 1:
                alert('注册失败', '用户名已存在', [
                    { text: 'Ok', onPress: () => console.log('sellerId exist') }
                ]);
                this.setState({ registerResult: 0 });
                break;
            case 2:
                alert('注册失败', '用户名或密码长度必须大于等于6', [
                    { text: 'Ok', onPress: () => console.log('length illegal') }
                ])
                this.setState({ registerResult: 0 });
                break;
            case 3:
                alert('注册失败', '两次密码输入不一致', [
                    { text: 'Ok', onPress: () => console.log('2 password not same') }
                ])
                this.setState({ registerResult: 0 });
                break;
            case 4: 
                alert('商户名不能为空', [
                    { text: 'Ok', onPress: () => console.log('sellerName null') }
                ])
                this.setState({ registerResult: 0 })
                break;
            default:
                break;
        }
    }

    render() {
        if (this.state.registerStatus == '0') {
            Router.push('/seller')
        }
        else if (this.state.registerStatus == '1') {
            this.state.registerStatus = 2;
            this.setState({ registerResult: 1 })
        }
        this.handleRegisterResult();

        return (
            <div>
                <div className="flex-container">
                    <div className="form-content">
                        <h2>注 册</h2>
                        <form onSubmit={this.handleRegister}>
                            <input type="text" value={this.state.sellerId} onChange={this.handleSellerIdChange} placeholder="商户ID" />
                            <input type="text" value={this.state.sellerName} onChange={this.handleSellerNameChange} placeholder="商户名" />
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="密码" />
                            <input type="password" value={this.state.password2} onChange={this.handlePassword2Change} placeholder="再次输入密码" />
                            <input type="submit" value="注 册" />
                        </form>
                        <WhiteSpace />
                        <div className="form-footer">
                            <a className="underline-hover" onClick={() => Router.push('/seller/login')}>已有帐户</a>
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

export default Register

