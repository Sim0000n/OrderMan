/* eslint no-dupe-keys: 0 */
import { ListView, Button, Card } from 'antd-mobile';
import ReactDOM from 'react-dom';
import MyCarousel from './MyCarousel';
import '../public/css/SellerList.css'
import Link from 'next/link'

const NUM_ROWS_PER_SECTION = 5;

class OrderList extends React.Component {
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
            height: (document.documentElement.clientHeight * 3) / 4,
        };
    }

    genData() {

        this.getData();

    }

    getOrderStatus(v) {
        switch (v) {
            case "1": return (<div>未付款</div>);
            case "2": return (<div>已付款，等待出餐</div>);
            case "3": return (<div>已完成</div>);
            default: console.log("nobody")
        }
    }

    async getData() {
        var bodyData = { 'seq': this.state.pageIndex, 'num': NUM_ROWS_PER_SECTION };
        console.log(bodyData);
        let that = this;
        fetch(`http://localhost:8081/api/getOrders`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            credentials: 'include',
            mode: 'cors',
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then((result) => {
                let lg = result.data.orders.length;
                if (lg <= 0) {
                    console.log("done")
                    return;
                }
                let dataArr = that.state.dataArr;
                let m = that.state.data;
                let hasMore = true;
                for (let i = 0; i < lg; i++) {
                    dataArr.push(`row - ${(that.state.pageIndex * lg) + i}`);
                    m.push(result.data.orders[i]);
                }
                if (result.data.orders.length < NUM_ROWS_PER_SECTION) {
                    hasMore = false;
                }
                that.rData = { ...that.rData, ...dataArr }
                this.setState({
                    data: m,
                    // pageIndex: that.state.pageIndex + 1,
                    dataSource: that.state.dataSource.cloneWithRows(that.rData),
                    dataArr: dataArr,
                    hasMore: hasMore,
                    isLoading: false
                })
            })
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop - 50;
        this.genData();
        this.setState({
            height: hei,
        });
    }


    onEndReached = (event) => {
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
            <div>
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
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.state.data.length;
            }
            const obj = this.state.data[index--];
            return (
                // <div key={rowID} style={{ padding: '0 15px' }}>
                // <Link href="/orders/[val]" as={`/orders/${obj.order_id}`}>
                //         <a>
                //             <div
                //                 style={{
                //                     lineHeight: '50px',
                //                     color: '#888',
                //                     fontSize: 18,
                //                     borderBottom: '1px solid #F6F6F6',
                //                 }}
                //             >{obj.seller_name}</div>
                //             <div style={{ display: 'flex', padding: '15px 0' }}>
                //                 <img style={{ height: '64px', marginRight: '15px' }} src={"http://localhost:8081/image/" + obj.img_name} alt="" />
                //                 <div style={{ lineHeight: 1 }}>
                //                     <div><span style={{ fontSize: '20px', color: '#FF6E27' }}>消费金额：{obj.spend}</span>¥ </div>
                //                     <div style={{ marginTop: '10px', fontWeight: 'bold' }}>{this.getOrderStatus(obj.order_status)}</div>
                //                 </div>
                //             </div>

                //         </a>
                //     </Link>
                // </div>
                <div>

                    <Link href="/orders/[val]" as={`/orders/${obj.order_id}`}>
                        <a style={{ width: "100%" }}>
                            <Card>
                                <Card.Header
                                    title={obj.seller_name}
                                    thumb={"http://localhost:8081/image/" + obj.img_name}
                                    thumbStyle={{ width: 80, height: 80 }}
                                    extra={this.getOrderStatus(obj.order_status)}
                                >

                                </Card.Header>
                                <Card.Body>
                                    <div className="introduction-wrap">{"创建时间：" + obj.create_time}</div>
                                    <div className="introduction-wrap">{"最后修改时间时间：" + obj.mod_time}</div>
                                </Card.Body>
                            </Card>
                            <Card.Footer extra={"订单金额：" + obj.spend} />
                        </a>
                    </Link>
                </div>
            );
        };

        return (
            <div>
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

export default OrderList;