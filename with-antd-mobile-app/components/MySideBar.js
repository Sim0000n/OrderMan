import { Drawer, List, WhiteSpace, Button, NavBar, Icon } from 'antd-mobile'
import '../public/css/MySideBar.css'
import Router from 'next/router'

class MySideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            minHeight: 0,
            indexKey: 0
        }
        this.onOpenChange = this.onOpenChange.bind(this);
    }

    componentDidMount() {
        this.setState({ minHeight: document.documentElement.clientHeight })
    }

    sidebar = (<List>
        <List.Item
            thumb="" 
            onClick={() => {Router.push('/seller')}}
        >
            我的商户
        </List.Item>
        <List.Item
            thumb="" 
            onClick={() => {Router.push('/seller/commodity')}}
        >
            我的餐品
        </List.Item>
        <List.Item
            thumb=""
            onClick={() => {Router.push('/seller/order')}}
        >
            我的订单
        </List.Item>
        <List.Item
            thumb=""
            onClick={() => {Router.push('/seller/activity')}}
        >
            我的活动
        </List.Item>
    </List>);

    onOpenChange() {
        console.log(this.state.open)
        this.setState({ open: !this.state.open })
    }


    renderHome() {
        return (<div>
            <NavBar
                icon={<Icon type="ellipsis" />}
                onLeftClick={this.onOpenChange}
            >
                商户管理系统
        </NavBar>
            <Drawer
                className="my-drawer"
                style={{ minHeight : this.state.minHeight }}
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebar={this.sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
            </Drawer>
        </div>)

    }


    render() {
        return (<div>
            {this.renderHome()}
        </div>
        )
    }

}


export default MySideBar;