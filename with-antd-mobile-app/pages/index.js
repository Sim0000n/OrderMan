import { Tabs, TabBar, Button, WhiteSpace } from 'antd-mobile'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import MySearchBar from '../components/MySearchBar'
import '../public/css/index.css'
import SellerList from '../components/SellerList'
import OrderList from '../components/OrderList'
import MyList from '../components/MyList'
import MyCarousel from '../components/MyCarousel'

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const tabs = [
    { title: '默认排序', sub: '1' },
    { title: '按销量排序', sub: '2' }
]

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "homeTab",
            loginStatus: -1,
            userName: '请登录'
        };
    };



    async logout() {
        fetch(`http://localhost:8081/api/logout`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
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
                    <h1 className="notlogin-slogan">美好的一餐从登陆开始</h1>
                    <Button type='primary' onClick={() => Router.push('/login')}>点击登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={() => Router.push('/register')}>没有帐户？加入我们</Button>
                </div>
            </div>
        )
    }

    renderHome() {
        if (this.state.loginStatus == 0) {
            return this.notLoginPage();
        } else if (this.state.loginStatus == -1) {
            return;
        }
        return (
            <div>
                <div style={{
                    // marginTop: 20
                }}>
                    {/* <h1 className="orderman-slogan">OrderMan</h1> */}
                    <div>
                        <MySearchBar />
                        <MyCarousel />
                    </div>
                    <Tabs tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div>
                            <SellerList id='0'/>
                        </div>
                        <div>
                            <SellerList id='1'/>
                        </div>
                    </Tabs>
                </div>
            </div>
        );

    }

    renderOrder() {
        if (this.state.loginStatus == 0) {
            return this.notLoginPage();
        }
        return (
            <div>
                <h1 className="my-order-h1">我的订单</h1>
                <OrderList />
            </div>
        )
    }
    renderMy() {
        if (this.state.loginStatus == 0) {
            return this.notLoginPage();
        }
        return (
            <div>
                <div className="my-wrapper">
                    <h1 className="hello-slogan">你好, {this.state.userName}</h1>
                </div>
                <MyList />
                <div className="exit-button">
                    <Button type='warning' onClick={() => this.logout()}>退出登录</Button>
                </div>
            </div>
        )
    }

    async isLogin() {
        fetch("http://localhost:8081/api/login", {
            method: "GET",
            credentials: "include",
            mode: "cors"
        }).then((res) => res.json())
            .then((result) => {
                this.setState({
                    loginStatus: result.data.status,
                    userName: result.data.userName
                })
            })
    }

    componentDidMount() {
        this.isLogin()
    }

    render() {
        sleep(100000)
        return (
            <div style={{
                position: "fixed",
                // bottom: '0px',
                height: '100%',
                width: '100%',
                top: 0
            }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition="bottom"
                >
                    <TabBar.Item
                        title="订餐"
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
                        title="订单"
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
                        title="我的"
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


export default Index;
