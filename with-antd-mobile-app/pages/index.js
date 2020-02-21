import { TabBar, Button, WhiteSpace } from 'antd-mobile'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

class MyTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "homeTab",
            loginStatus: 0,
            userName: '请登录'
        };
    };

    async logout() {
        fetch(`http://127.0.0.1:8081/api/logout`, {
            method: 'GET',
            credentials: 'include',
            mode:'cors'
        }).then(console.log('logout'))
        .then(() => this.setState({
            loginStatus: 0
        }))
    }
    notLoginPage() {
        return (
            <div>
                <div className='notlogin-wrapper'>
                    <WhiteSpace />
                    <h1>美好的一餐从登陆开始</h1>
                    <Button type='primary' onClick={() => Router.push('/login')}>点击登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={() => Router.push('/register')}>没有帐户？加入我们</Button>
                </div>
                <style jsx>{`
                    h1 {
                        text-align: center;
                        font-size: 38px;
                    }
                    .notlogin-wrapper {
                        padding: 20px;
                        align-items: center;
                        padding-top: 30px;
                    } 
                `}
                </style>

            </div>
        )
    }

    renderHome() {
        if (this.state.loginStatus == 0) {
            return this.notLoginPage();
        }
        return (
            <div style={{
                marginTop: 20
            }}>
                <h1>Home Page</h1>
                <a>{this.state.loginStatus}</a>
                <a>{this.state.userName}</a>
            </div>
        );

    }

    renderOrder() {
        if (this.state.loginStatus == 0) {
            return this.notLoginPage();
        }
    }

    renderMy() {
        if (this.state.loginStatus == 0) {
            return this.notLoginPage();
        }
        return (
            <div>
                <div className="my-wrapper">
                    <h1>你好,{this.state.userName}</h1>
                    <Button type='warning' onClick={() => this.logout()}>退出登录</Button>
                </div>
                <style jsx>{`
                    h1 {
                        font-size: 40px;
                    }
                    .my-wrapper{
                        padding: 20px;
                    } 
                `}
                </style>
            </div>
        )
    }

    async componentDidMount() {
        const res = await fetch("http://127.0.0.1:8081/api/login", {
            method: "GET",
            credentials: 'include',
            mode: 'cors'
        })
        const json = await res.json()
        console.log(json)
        this.setState({
            loginStatus: json.data.status,
            userName: json.data.userName
        })
        console.log(this.state)

    }

    render() {
        return (
            <div style={{
                position: "fixed",
                //                bottom: '0px',
                height: '100%',
                width: '100%',
                top: 0
            }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="Home"
                        key="Home"
                        icon={<div
                            style={{
                                width: '22px',
                                height: '22px',
                                background: 'url("/image/burger_bg.svg") center center /  21px 21px no-repeat'
                            }}
                        />}
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url("/image/burger.svg") center center /  21px 21px no-repeat'
                        }} />}
                        selected={this.state.selectedTab === 'homeTab'}
                        onPress={() => {
                            this.setState({ selectedTab: 'homeTab' })
                        }}
                    >
                        {this.renderHome()}
                    </TabBar.Item>

                    <TabBar.Item
                        title="Order"
                        key="Order"
                        icon={<div
                            style={{
                                width: '22px',
                                height: '22px',
                                background: 'url("/image/order_bg.svg") center center /  21px 21px no-repeat'
                            }} />}
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url("/image/order.svg") center center /  21px 21px no-repeat'
                        }} />}
                        selected={this.state.selectedTab === 'orderTab'}
                        onPress={() => {
                            this.setState({ selectedTab: 'orderTab' });
                        }}
                    >
                        {this.renderOrder()}
                    </TabBar.Item>
                    <TabBar.Item
                        title="My"
                        key="My"
                        icon={<div
                            style={{
                                width: '22px',
                                height: '22px',
                                background: 'url("/image/user_bg.svg") center center /  21px 21px no-repeat'
                            }} />}
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url("/image/user.svg") center center /  21px 21px no-repeat'
                        }} />}
                        selected={this.state.selectedTab === 'myTab'}
                        onPress={() => {
                            this.setState({ selectedTab: 'myTab' })
                        }}
                    >
                        {this.renderMy()}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }

}


export default MyTabBar;
