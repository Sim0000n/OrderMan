import MyNavBar from '../components/MyNavBar'
import { Modal, List, InputItem, Button } from 'antd-mobile';
import Router from 'next/router';

const alert = Modal.alert;

class ChangePassWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword1: '',
            newPassword2: '',
        }
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onNewPassword1Change = this.onNewPassword1Change.bind(this)
        this.onNewPassword2Change = this.onNewPassword2Change.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    onPasswordChange(v) {
        this.setState({
            password: v
        })
    }

    onNewPassword1Change(v) {
        this.setState({
            newPassword1: v
        })
    }

    onNewPassword2Change(v) {
        this.setState({
            newPassword2: v
        })
    }

    async changePassword() {
        if(this.state.newPassword1.length < 6) {
            alert('修改失败', '密码至少6个字符', [{text:'Ok'}])
        } else if(this.state.newPassword1 !== this.state.newPassword2) {
            alert('修改失败', '两次输入的新密码不一致', [{text:'Ok'}])
        } else {
            var bodyData = {
                'password': this.state.password,
                'newPassword': this.state.newPassword1
            }
            fetch('http://localhost:8081/api/changePassword', {
                method:'POST',
                credentials: 'include',
                mode:'cors',
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
            .then((result) => {
                if(result.data.status == '0') {
                    alert('修改失败', '原密码错误', [{text: 'Ok'}])
                } else {
                    alert('修改成功', '点击Ok跳回主页', [{text: 'Ok'}])
                    Router.push('/error', '/')
                }
            })
        }
    }

    render() {
        return(<div>
            <MyNavBar/>
            <List>
                <InputItem
                    type="password" 
                    placeholder="请输入原密码"
                    onChange={(v) => this.onPasswordChange(v)}
                >
                    原密码
                </InputItem>
                <InputItem
                    type="password" 
                    placeholder="请输入新密码"
                    onChange={(v) => this.onNewPassword1Change(v)}
                >
                    新密码
                </InputItem>
                <InputItem
                    type="password" 
                    placeholder="请再次输入新密码"
                    onChange={(v) => this.onNewPassword2Change(v)}
                >
                    新密码
                </InputItem>
                <Button onClick={this.changePassword}>提交</Button>
            </List>
        </div>) 
    }
}

export default ChangePassWord