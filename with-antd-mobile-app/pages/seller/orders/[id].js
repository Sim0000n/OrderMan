/* eslint no-dupe-keys: 0 */
import { ListView, Button, Flex, NavBar, Icon, Modal, List, Card, WhiteSpace } from 'antd-mobile';
import '../../../public/css/order.css'
import Router from 'next/router'


const alert = Modal.alert;
const operation = Modal.operation;

class Order extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            data: [],
            dataArr: [],
            pageIndex: 0,
            hasMore: true,
            dataSource,
            isLoading: true,
            height: 0,
            order: '',
            commodities: [],
            modal: false,
        };
        this.getOrderInfo = this.getOrderInfo.bind(this)
        this.changeOrderStatus = this.changeOrderStatus.bind(this)
    }


    static getInitialProps({ query }) {
        return { query };
    }

    genData() {

        this.getData();

    }

    async getOrderInfo() {
        var bodyData = {
            orderId: this.props.query.id
        }
        fetch('http://localhost:8081/api/getOrderInfo', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((result) => {
                this.setState({
                    commodities: result.data.commodities,
                    order: result.data.order
                })
            })
    }

    myAlert() {
        alert('修改失败', '订单状态不能回退', [{ text: 'Ok' }])
    }

    async changeOrderStatus(v) {
        let orderStatus = this.state.order.order_status
        if (orderStatus == '2') {
            if (v == '1') {
                this.myAlert();
                return;
            }
        } else if (orderStatus == '3') {
            if (v !== '3') {
                this.myAlert();
                return;
            }
        }
        var bodyData = {
            'orderId': this.state.order.order_id,
            'orderStatus': v
        }
        fetch('http://localhost:8081/api/seller/changeOrderStatus', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(alert('修改成功', '订单状态已修改', [{ text: 'Ok' }]))
            .then(this.getOrderInfo)
    }


    componentDidMount() {
        this.getOrderInfo();
    }

    getOrderStatus(v) {
        switch (v) {
            case "1": return (<Button type="primary" onClick={this.myOperation}>未付款</Button>);
            case "2": return (<Button type="primary" onClick={this.myOperation}>已付款，等待出餐</Button>);
            case "3": return (<Button type="primary" onClick={this.myOperation}>已完成</Button>);
            default: console.log("nobody")
        }
    }

    myOperation = () => {
        operation([
            { text: '未付款', onPress: () => this.changeOrderStatus("1") },
            { text: '已付款，等待出餐', onPress: () => this.changeOrderStatus("2") },
            { text: '已完成', onPress: () => this.changeOrderStatus("3") }
        ])
    }

    render() {
        return (<div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => Router.push('/seller')}
            >我的订单</NavBar>
            <List>
                <List.Item>
                    <Card>
                        <Card.Header
                            title={this.state.order.seller_name}
                            thumb={"http://localhost:8081/image/" + this.state.order.img_name}
                            thumbStyle={{ width: 80, height: 80 }}
                            extra={this.getOrderStatus(this.state.order.order_status)}
                        />
                        <Card.Body>
                            <div className="introduction-wrap">{"创建时间：" + this.state.order.create_time}</div>
                            <div className="introduction-wrap">{"最后修改时间时间：" + this.state.order.mod_time}</div>
                        </Card.Body>

                    </Card>
                    <Card.Footer content={"用户名"+this.state.order.user_name} extra={"消费金额"+this.state.order.spend}></Card.Footer>
                </List.Item>
                <WhiteSpace />
                {this.state.commodities.map(val => (
                    <List.Item>
                        <Card>
                            <Card.Header
                                title={val.commodity_name}
                                thumb={"http://localhost:8081/image/" + val.img_name}
                                extra={<span>数量：{val.num}</span>}
                            />
                            <Card.Body>
                                <div className="introduction-wrap" >{val.commodity_introduction}</div>
                            </Card.Body>
                        </Card>
                    </List.Item>
                ))}
            </List>

        </div>)
    }

}

export default Order;