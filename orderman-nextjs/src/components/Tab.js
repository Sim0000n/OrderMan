import { TabBar } from 'antd-mobile'
import Router from 'next/router'

class MyTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: props.selectedTab,
        };
    };

    renderContent(pageText) {

    }

    render() {
        return (
            <div style={{
                position:"fixed",
                bottom:'0px',
                width: '100%'
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
                            Router.push('/home')
                        }}
                    >
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
                            Router.push('/order') 
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
                            Router.push('/my')
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }

}

export default MyTabBar;
