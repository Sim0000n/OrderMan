/* eslint no-dupe-keys: 0 */
import { ListView, Button, Flex, NavBar, Icon, Modal, Card, WhiteSpace } from 'antd-mobile';
import ReactDOM from 'react-dom';
import '../../public/css/SellerList.css'
import Router from 'next/router';
import '../../public/css/commodities.css'
const NUM_ROWS_PER_SECTION = 10;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
let myData = [];

const alert = Modal.alert;

class CommoditiesList extends React.Component {
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
            cart: new Map(),
            sellerName: '',
            sellerImg: '',
            sellerIntroduction: '',
            visible: false
        };
        this.onCommodityNumChange = this.onCommodityNumChange.bind(this)
        this.onRightClick = this.onRightClick.bind(this)
        this.onLeftClick = this.onLeftClick.bind(this)
        this.newOrder = this.newOrder.bind(this)
        this.onClose = this.onClose.bind(this)
        this.showModal = this.showModal.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
    }

    onClose() {
        this.setState({
            visible: false
        })
    }

    showModal(event) {
        // this.setState({
        //     visible: true
        // })
        var id = event.currentTarget.id || event.target.id
        console.log(id)
        alert('商品简介', id, [{ text: 'OK' }])
    }

    onCommodityNumChange(id, nums) {
        console.log(id, nums)
    }

    onRightClick(id) {
        console.log(id)
        let that = this;
        let tmp = that.state.cart;
        let nums = tmp.get(id) + 1;
        tmp.delete(id);
        tmp.set(id, nums);
        console.log(tmp)
        this.setState({ cart: tmp })
    }

    onLeftClick(id) {
        let that = this;
        let tmp = that.state.cart;
        let nums = tmp.get(id);
        if (nums !== 0) {
            nums = nums - 1;
        }
        tmp.delete(id);
        tmp.set(id, nums);
        this.setState({ cart: tmp })
    }

    static getInitialProps({ query }) {
        return { query };
    }

    genData() {

        this.getData();

    }

    async newOrder() {
        var cartArray = [];
        for (let [id, num] of this.state.cart) {
            if (num !== 0) {
                cartArray.push({
                    'commodityId': id,
                    'num': num
                })
            }
        }
        if (cartArray.length == 0) {
            alert('提交订单失败', '您没有选中任何餐品', [{ text: 'Ok' }]);
            return;
        }
        var bodyData = {
            'cartList': cartArray,
            'sellerUuid': this.props.query.id
        }
        fetch('http://localhost:8081/api/newOrder', {
            method: 'POST',
            body: JSON.stringify(bodyData),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((result) => {
                var url = '/orders/' + result.data.orderId
                alert('生成订单成功', '点击Ok返回主页已查看订单', [{ text: 'Ok', onPress: () => { Router.push(url) } }])
            })
    }

    async getSellerInfo() {
        var bodyData = { 'sellerUuid': this.props.query.id };
        fetch('http://localhost:8081/api/getSellerInfo', {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((result) => {
                this.setState({
                    sellerName: result.data.sellerName,
                    sellerImg: result.data.sellerImg,
                    sellerIntroduction: result.data.sellerIntroduction
                })
            })
    }

    async getData() {
        var bodyData = { 'sellerUuid': this.props.query.id, 'seq': this.state.pageIndex, 'num': NUM_ROWS_PER_SECTION };
        console.log(bodyData);
        let that = this;
        fetch(`http://localhost:8081/api/getCommodities`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            credentials: 'include',
            mode: 'cors',
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then((result) => {
                console.log(result.data.commodities)
                let lg = result.data.commodities.length;
                if (lg <= 0) {
                    console.log("done")
                    return;
                }
                let dataArr = that.state.dataArr;
                let m = that.state.data;
                let cart = that.state.cart;
                let hasMore = true;
                for (let i = 0; i < lg; i++) {
                    dataArr.push(`row - ${(that.state.pageIndex * lg) + i}`);
                    m.push(result.data.commodities[i]);
                    cart.set(result.data.commodities[i].commodity_id, 0);
                }
                if (result.data.commodities.length < NUM_ROWS_PER_SECTION) {
                    hasMore = false;
                }
                that.rData = { ...that.rData, ...dataArr }
                this.setState({
                    data: m,
                    // pageIndex: that.state.pageIndex + 1,
                    dataSource: that.state.dataSource.cloneWithRows(that.rData),
                    dataArr: dataArr,
                    hasMore: hasMore,
                    isLoading: false,
                    cart: cart
                })
            })
    }

    componentDidMount() {
        this.getSellerInfo();
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop - 50;
        this.genData();
        this.setState({
            height: hei,
        });
    }


    onEndReached = (event) => {
        console.log(this.state.pageIndex)
        console.log(this.state.hasMore)
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log("end reach")
        this.setState({ isLoading: true, pageIndex: this.state.pageIndex + 1 });
        let that = this;
        setTimeout(() => {
            that.genData();
        }, 1000);

    }

    renderHeader() {
        return (
            <div >
                <Card>
                    <Card.Header
                        title={this.state.sellerName}
                        thumb={"http://localhost:8081/image/" + this.state.sellerImg}
                        thumbStyle={{ width: 80, height: 80 }}
                    // extra={<span>数量：{val.num}</span>}
                    />
                    <Card.Body>
                        <div className="introduction-wrap" >商家简介：{this.state.sellerIntroduction}</div>
                    </Card.Body>
                </Card>
                <WhiteSpace/>
            </div>
        )
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = this.state.data.length - 1;
        let nums = 0;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.state.data.length;
            }
            const obj = this.state.data[index--];
            let commodity_id = obj.commodity_id;
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    {/* <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.commodity_name}</div> */}
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                        <div id={obj.commodity_introduction} onClick={(e) => this.showModal(e)}>
                            <img style={{ height: '64px', marginRight: '15px' }} src={"http://localhost:8081/image/" + obj.img_name} alt="" />
                        </div>
                        <div style={{ lineHeight: 1, width: '100%' }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'normal', color: '#000000', fontSize: 24 }}>{obj.commodity_name}</div>
                            <div style={{ color: '#4169E1' }}>销售量 <span style={{ fontSize: 15, color: '#FF6E27' }}>{obj.sales}</span></div>
                            <div>
                                <Flex type="wrap" align="center">
                                    <Flex.Item>
                                        <div style={{ margin: "10px 10px 10px 10px" }}><span style={{ fontSize: '20px', color: '#FF6E27' }}>{obj.commodity_price}￥</span></div>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <Flex>
                                            <Flex.Item>
                                                <div style={{ background: 'url("/image/minus.svg") center center /  21px 21px no-repeat', height: '21px', width: '21px' }} id={commodity_id} onClick={(e) => this.onLeftClick(e.target.id)}></div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <span>{this.state.cart.get(commodity_id)}</span>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <div style={{ background: 'url("/image/plus.svg") center center /  21px 21px no-repeat', height: '21px', width: '21px' }} id={commodity_id} onClick={(e) => this.onRightClick(e.target.id)}></div>
                                            </Flex.Item>
                                        </Flex>
                                    </Flex.Item>
                                </Flex>
                            </div>
                            {/* <Modal
                                visible={this.state.visible}
                                transparent={true}
                                maskClosable={false}
                                title={obj.commodity_name}
                                footer={[{ text: 'Ok', onPress: () => { this.onClose(); } }]}
                                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            >
                                <div style={{ height: 100, overflow: 'scroll' }}>
                                    {obj.commodity_introduction}
                                </div>
                            </Modal> */}
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => Router.push('/error', '/')}
                    rightContent={[
                        <Icon key="1" type="check" onClick={this.newOrder} />,
                    ]}
                >点餐</NavBar>

                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={this.renderHeader}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    // renderSectionHeader={sectionData => (
                    //     <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                    // )}
                    renderRow={row}
                    renderSeparator={separator}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={5}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={500}
                />
            </div>
        );
    }
}

export default CommoditiesList;