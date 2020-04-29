import fetch from 'isomorphic-unfetch'
import { Drawer, List, WhiteSpace, Button, NavBar, Icon } from 'antd-mobile'
import MySideBar from '../../components/MySideBar'

class Commodity extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            sellerId: '',
            sellerName: '',
            loginStatus: '',
        }
    }

    async componentDidMount() {
        const res = await fetch("http://localhost:8081/api/seller/login", {
            method: "GET",
            credentials: "include",
            mode: 'cors'
        })
        const json = await res.json();
        console.log(json)
        this.setState({
            loginStatus: json.data.status,
            sellerName: json.data.sellerName,
            sellerId: json.data.sellerId
        })
    }

    notLoginPage() {
        return (<div>
            <div className='notlogin-wrapper'>
                <WhiteSpace />
                <h1 className="orderman-slogan">OrderMan</h1>
                <h1 className="notlogin-slogan">商户管理系统</h1>
                <Button type='primary' onClick={() => Router.push('/login')}>点击登录</Button>
                <WhiteSpace />
                <Button type='primary' onClick={() => Router.push('/register')}>没有帐户？加入我们</Button>
            </div>
        </div>)
    }


    renderHome() {
        if (this.state.loginStatus == 1) {
            return this.notLoginPage();
        }
        return (<div>
            <MySideBar />
            
        </div>)

    }


    render() {
        return (<div>
            {this.renderHome()}
        </div>
        )
    }

}

export default Commodity;