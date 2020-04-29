/* eslint no-dupe-keys: 0 */
import { Card, List, ListView, Button, Flex, NavBar, Icon, Modal } from 'antd-mobile';
import ReactDOM from 'react-dom';
import Router from 'next/router';
import '../public/css/order.css'
import Link from 'next/link'

const NUM_ROWS_PER_SECTION = 5;
const alert = Modal.alert;

class CommodityList extends React.Component {
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
            sellerUuid: '',
        };
    }

    genData() {

        this.getData();

    }

    async getData() {
        var bodyData = { 'seq': this.state.pageIndex, 'num': NUM_ROWS_PER_SECTION };
        console.log(bodyData);
        let that = this;
        fetch(`http://localhost:8081/api/seller/getCommodities`, {
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
                let hasMore = true;
                for (let i = 0; i < lg; i++) {
                    dataArr.push(`row - ${(that.state.pageIndex * lg) + i}`);
                    m.push(result.data.commodities[i]);
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
                })
            })
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop - 50;
        this.genData();
        this.setState({
            height: hei,
        })
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
                我的餐品
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
                <div>
                    <Link href="/seller/commodities/[val]" as={`/seller/commodities/${obj.commodity_id}`}>
                        <a style={{width: "100%"}}>
                            <Card>
                                <Card.Header
                                    title={obj.commodity_name}
                                    thumb={"http://localhost:8081/image/" + obj.img_name}
                                    thumbStyle={{ width: 80, height: 80 }}
                                    extra={obj.commodity_price + "￥"}
                                />
                                <Card.Body>
                                    <div className="introduction-wrap">{obj.commodity_introduction}</div>
                                </Card.Body>
                            </Card>
                            <Card.Footer extra={<div>餐品信息</div>} />
                        </a>
                    </Link>
                </div >
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
            </div >
        );
    }
}

export default CommodityList;