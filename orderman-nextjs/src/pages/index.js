import { TabBar, Button, WhiteSpace } from 'antd-mobile'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import cookies from 'next-cookies';

class MyTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "homeTab", 
            loginStatus: 0,
            userName: '请登录'
        };
    };

    renderHome() {
        if (this.state.loginStatus == 0) {
            console.log('not login')
            return (
                <div>
                    <WhiteSpace/>
                    <h1>登录以享受全部功能</h1>
                    <Button onClick={ ()=>Router.push('/login') }>点击登录</Button>
                </div>
            )
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
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }

}


export default MyTabBar;
