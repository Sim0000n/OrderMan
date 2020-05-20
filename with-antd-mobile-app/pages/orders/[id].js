/* eslint no-dupe-keys: 0 */
import { ListView, Button, Flex, NavBar, Icon, Modal, List, Card, WhiteSpace } from 'antd-mobile';
import '../../public/css/order.css'
import Router from 'next/router'


const alert = Modal.alert;

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
            commodities: []
        };
        this.getOrderInfo = this.getOrderInfo.bind(this)
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



    componentDidMount() {
        this.getOrderInfo();
    }


    getOrderStatus(v) {
        switch (v) {
            case "1": return (<div>未付款</div>);
            case "2": return (<div>已付款，等待出餐</div>);
            case "3": return (<div>已完成</div>);
            default: console.log("nobody")
        }
    }

    pay() {
        var bodyData = {
            'orderId': this.state.order.order_id,
            'orderStatus': '2',
        }
        fetch('http://localhost:8081/api/seller/changeOrderStatus', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(alert('付款', '已付款', [{ text: 'Ok' }]))
            .then(() => {
                var url = '/orders/' + this.state.order.order_id
                Router.push(url)
            })
    }

    renderButton() {
        if (this.state.order.order_status == '1') {
            return (<div>
                <Button style={{ margin: 10 }} type="primary" onClick={() => alert('付款', '点击确认去付款', [{ text: 'OK', onPress: () => this.pay() }, { text: 'Cancel' }])}>
                    去付款
                </Button>
            </div>)
        } else if (this.state.order.order_status == '2') {
            return (<div>

            </div>)
        } else {
            return;
        }
    }

    render() {
        return (<div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => Router.push('/error', '/')}
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
                    <Card.Footer content={this.state.order.spend} extra={<div>餐品信息</div>} />
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
            {this.renderButton()}
        </div>)
    }

}

export default Order;