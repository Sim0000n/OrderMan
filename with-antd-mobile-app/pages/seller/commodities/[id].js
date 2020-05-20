import { Card, WhiteSpace, Modal, ImagePicker, InputItem, TextareaItem, List, Button, NavBar, Icon } from 'antd-mobile'
import Router from 'next/router';

const alert = Modal.alert;

class EditCommodity extends React.Component {
    static getInitialProps({ query }) {
        return { query }
    }

    constructor(props) {
        super(props)
        this.state = {
            commodityImg: '',
            commodityName: '',
            commodityIntroduction: '',
            commodityPrice: '',
            newCommodityImg: [],
            newCommodityName: '',
            newCommodityPrice: 1,
            newCommodityIntroduciton: '',
        }
        this.onNewCommodityNameChange = this.onNewCommodityNameChange.bind(this)
        this.onNewCommodityPriceChange = this.onNewCommodityPriceChange.bind(this)
        this.onNewCommodityIntroductionChange = this.onNewCommodityIntroductionChange.bind(this)
        this.onNewCommodityImgChange = this.onNewCommodityImgChange.bind(this)
        this.changeCommodityImg = this.changeCommodityImg.bind(this)
        this.changeCommodityPrice = this.changeCommodityPrice.bind(this)
        this.changeCommodityName = this.changeCommodityName.bind(this)
        this.changeCommodityIntroduction = this.changeCommodityIntroduction.bind(this)
        this.getCommodityInfo = this.getCommodityInfo.bind(this)
    }

    componentDidMount() {
        this.getCommodityInfo()
    }

    async getCommodityInfo() {
        var bodyData = {
            'commodityId': this.props.query.id
        }
        fetch('http://localhost:8081/api/seller/getCommodityInfo', {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((result) => {
                this.setState({
                    'commodityName': result.data.commodity_name,
                    'commodityImg': result.data.img_name,
                    'commodityIntroduction': result.data.commodity_introduction,
                    'commodityPrice': result.data.commodity_price
                })
            })
    }

    onNewCommodityImgChange(v) {
        this.setState({ newCommodityImg: v })
    }

    onNewCommodityNameChange(v) {
        this.setState({ newCommodityName: v })
    }

    onNewCommodityPriceChange(v) {
        this.setState({ newCommodityPrice: v })
    }

    onNewCommodityIntroductionChange(v) {
        this.setState({ newCommodityIntroduciton: v })
    }

    async changeCommodityImg() {
        var formData = new FormData();
        formData.append("file", this.state.newCommodityImg[0].file);
        formData.append("commodityId", this.props.query.id);
        fetch('http://localhost:8081/api/seller/changeCommodityImg', {
            method: "POST",
            credentials: "include",
            mode: "cors",
            body: formData,
        }).then(alert('修改成功', '商品图片修改成功', [{ text: 'Ok' }]))
    }

    async changeCommodityName() {
        var bodyData = {
            'commodityId': this.props.query.id,
            'commodityName': this.state.newCommodityName,
        }
        fetch('http://localhost:8081/api/seller/changeCommodityName', {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(alert('修改成功', '成功修改商品名称', [{ text: 'Ok' }]))
    }

    async changeCommodityPrice() {
        var bodyData = {
            'commodityId': this.props.query.id,
            'commodityPrice': this.state.newCommodityPrice,
        }
        fetch('http://localhost:8081/api/seller/changeCommodityPrice', {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(alert('修改成功', '成功修改商品价格', [{ text: 'Ok' }]))
    }

    async changeCommodityIntroduction() {
        var bodyData = {
            'commodityId': this.props.query.id,
            'commodityIntroduction': this.state.newCommodityIntroduciton,
        }
        fetch('http://localhost:8081/api/seller/changeCommodityIntroduction', {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(alert('修改成功', '成功修改商品简介', [{ text: 'Ok' }]))
    }

    render() {
        return (<div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => Router.push('/seller')}
            >
                编辑餐品
            </NavBar>

            <Card>
                <Card.Header
                    title={this.state.commodityName}
                    thumb={"http://localhost:8081/image/" + this.state.commodityImg}
                    thumbStyle={{ width: 80, height: 80 }}
                    extra={<span>价格：{this.state.commodityPrice}</span>}
                />
                <Card.Body>
                    <div className="introduction-wrap" >{this.state.commodityIntroduction}</div>
                </Card.Body>
            </Card>
            <List renderHeader={() => '商品图片(第一张为准）'}>
                <List.Item>
                    <ImagePicker
                        files={this.state.newCommodityImg}
                        onChange={(files) => this.onNewCommodityImgChange(files)}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        multiple={false}
                        style={{ width: "100%" }}
                    />
                    <Button onClick={this.changeCommodityImg}>提交</Button>
                </List.Item>
            </List>
            <WhiteSpace />
            <List renderHeader={() => '商品基本信息'} >
                <List.Item>
                    <TextareaItem
                        title="商户名"
                        placeholder="输入商品名称"
                        onChange={(val) => { this.onNewCommodityNameChange(val) }}
                    />
                    <Button onClick={this.changeCommodityName}>提交</Button>
                </List.Item>
                <List.Item>
                    <TextareaItem
                        title="商品简介"
                        placeholder="输入商品简介"
                        onChange={(val) => { this.onNewCommodityIntroductionChange(val) }}
                    />
                    <Button onClick={this.changeCommodityIntroduction}>提交</Button>
                </List.Item>
                <List.Item>
                    <InputItem
                        type="money"
                        placeholder="输入商品价格"
                        onChange={(val) => { this.onNewCommodityPriceChange(val) }}
                    >商品价格</InputItem>
                    <Button onClick={this.changeCommodityPrice}>提交</Button>
                </List.Item>
            </List>
            {/* <List renderHeader={() => '删除商品'}>
                <List.Item>
                    <Button type="warning" onClick={() => alert('警告', '确定删除商品？',
                        [{ text: '确定', onPress: () => this.deleteCommodity() },
                        { text: '取消' }])}>删除商品</Button>
                </List.Item>

            </List> */}
        </div >)
    }

}

export default EditCommodity;