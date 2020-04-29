import fetch from 'isomorphic-unfetch'
import { Modal, Drawer, List, WhiteSpace, Button, NavBar, Icon, ImagePicker, TextareaItem, InputItem } from 'antd-mobile'
import MySideBar from '../../components/MySideBar'
import Router from 'next/router'
import CommodityList from '../../components/CommodityList'
import SellerOrderList from '../../components/SellerOrderList'


const alert = Modal.alert;
class SellerHome extends React.Component {
    sidebar = (<List>
        <List.Item
            thumb=""
            onClick={() => { this.setState({ indexKey: 0, open: false }) }}
        >
            我的商户
        </List.Item>
        <List.Item
            thumb=""
            onClick={() => { this.setState({ indexKey: 1, open: false }) }}
        >
            我的餐品
        </List.Item>
        <List.Item
            thumb=""
            onClick={() => { this.setState({ indexKey: 2, open: false }) }}
        >
            新建餐品
        </List.Item>
        <List.Item
            thumb=""
            onClick={() => { this.setState({ indexKey: 3, open: false }) }}
        >
            我的订单
        </List.Item>
        <List.Item
            thumb=""
            onClick={() => { this.setState({ indexKey: 4, open: false }) }}
        >
            我的活动
        </List.Item>
        <List.Item
            thumb=""
            onClick={() => { this.setState({ indexKey: 5, open: false }) }}
        >
            新建活动
            </List.Item>
        <List.Item
            thumb=""
            onClick={this.logout}
        >
            退出账户
        </List.Item>
    </List>);

    renderPage() {
        switch (this.state.indexKey) {
            case 0: return this.renderMySeller();
            case 1: return this.renderMyCommodities();
            case 2: return this.renderNewCommodity();
            case 3: return this.renderMyOrders();
            case 4: return this.renderMyActivities();
            case 5: return this.renderNewActivity();
        }

    }

    constructor(props) {
        super(props);
        this.state = {
            clear: true, 
            sellerId: '',
            sellerName: '',
            loginStatus: '',
            open: false,
            minHeight: 0,
            indexKey: 0,
            imgUrl: '/image/personal.svg',
            newImg: '',
            newSellerName: '',
            password: '',
            newPassword1: '',
            newPassword2: '',
            changePasswordStatus: 1,
            introduction: '',

            newCommodityImg: [],
            newCommodityName: '',
            newCommodityPrice: 1,
            newCommodityIntroduciton: '',
            addCommodityStatus: 0,

            newSellerAvatar: [],
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.onNewSellerNameChange = this.onNewSellerNameChange.bind(this)
        this.changeSellerName = this.changeSellerName.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onNewPassword1Change = this.onNewPassword1Change.bind(this)
        this.onNewPassword2Change = this.onNewPassword2Change.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onIntroductionChange = this.onIntroductionChange.bind(this)
        this.changeIntroduction = this.changeIntroduction.bind(this)
        this.onNewCommodityNameChange = this.onNewCommodityNameChange.bind(this)
        this.onNewCommodityPriceChange = this.onNewCommodityPriceChange.bind(this)
        this.onNewCommodityIntroductionChange = this.onNewCommodityIntroductionChange.bind(this)
        this.addNewCommodity = this.addNewCommodity.bind(this)
        this.onNewCommodityImgChange = this.onNewCommodityImgChange.bind(this)
        this.onNewSellerAvatarChange = this.onNewSellerAvatarChange.bind(this)
        this.changeSellerAvatar = this.changeSellerAvatar.bind(this)
        this.logout = this.logout.bind(this)
    }

    async componentDidMount() {
        this.setState({ minHeight: document.documentElement.clientHeight })
        const res = await fetch("http://localhost:8081/api/seller/login", {
            method: "GET",
            credentials: "include",
            mode: 'cors'
        })
        const json = await res.json();
        console.log(json)
        this.setState({
            loginStatus: json.data.status,
            sellerName: json.data.sellerName,
            sellerId: json.data.sellerId
        })
    }

    async logout() {
        fetch('http://localhost:8081/api/seller/logout', {
            method: "GET",
            credentials: "include",
            mode: "cors"
        }).then(console.log("logout"))
            .then(() => this.setState({ loginStatus: 0 }))
    }

    async addNewCommodity() {
        var formData = new FormData();
        formData.append("file", this.state.newCommodityImg[0].file);
        formData.append("commodityName", this.state.newCommodityName);
        formData.append("commodityPrice", this.state.newCommodityPrice);
        formData.append("commodityIntroduction", this.state.newCommodityIntroduciton)
        // var data = {
        //     'commodityName': this.state.newCommodityName,
        //     'commodityPrice': this.state.newCommodityPrice,
        //     'commodityIntroduction': this.state.newCommodityIntroduciton
        // }
        fetch('http://localhost:8081/api/seller/newCommodity', {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: formData,
            headers: {
            }
        }).then(alert('添加成功', '您的新商品已可售', [{ text: 'Ok' }]))
    }

    async changeSellerAvatar() {
        var formData = new FormData();
        formData.append("file", this.state.newSellerAvatar[0].file);
        fetch('http://localhost:8081/api/seller/changeSellerAvatar', {
            method: "POST",
            credentials: "include",
            mode: "cors",
            body: formData,
            headers: {}
        }).then(alert('修改头像', '头像修改成功', [{text:'Ok'}]))
    }

    onNewSellerAvatarChange(v) {
        this.setState({ newSellerAvatar: v })
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

    onOpenChange() {
        this.setState({ open: !this.state.open })
    }

    onPasswordChange(v) {
        this.setState({ password: v })
    }

    onNewPassword1Change(v) {
        this.setState({ newPassword1: v })
    }

    onNewPassword2Change(v) {
        this.setState({ newPassword2: v })
    }

    onIntroductionChange(v) {
        this.setState({ introduction: v })
    }

    onImageChange(event) {
        let file = event.target.files[0];
        file.thumb = URL.createObjectURL(file)
        this.setState({ newImg: file })
        this.imageUpload();
    }

    onNewSellerNameChange(v) {
        this.setState({ newSellerName: v })
    }

    async imageUpload() {
        console.log(this.state.imgUrl)
        fetch("http://localhost:8081/api/seller/avatarUpload", {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: this.state.imgUrl,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(this.setState({ sellerName: this.state.newSellerName }))
    }

    async changeSellerName() {
        var data = { 'newSellerName': this.state.newSellerName }
        fetch("http://localhost:8081/api/seller/changeSellerName", {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async changePassword() {
        if (this.state.newPassword1.length < 6) {
            this.setState({ changePasswordStatus: 2 })
            return;
        }
        if (this.state.newPassword1 != this.state.newPassword2) {
            this.setState({ changePasswordStatus: 3 })
            return;
        }
        var data = ({
            'password': this.state.password,
            'newPassword': this.state.newPassword1
        });
        fetch("http://localhost:8081/api/seller/changeSellerPassword", {
            method: "POST",
            credentials: "include",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((result) => {
                this.setState({ changePasswordStatus: result.data.status })
            })
    }

    async changeIntroduction() {
        if (this.state.introduction.length >= 50) {
            alert('修改失败', '商户简介最长不能超过50字', [{ text: 'Ok' }])
            return;
        }
        var data = { 'introduction': this.state.introduction }
        fetch("http://localhost:8081/api/seller/changeIntroduction", {
            method: "POST",
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            alert('修改成功', '商户简介已修改', [{ text: 'Ok' }])
        })
    }

    notLoginPage() {
        return (<div>
            <div className='notlogin-wrapper'>
                <WhiteSpace />
                <h1 className="orderman-slogan">OrderMan</h1>
                <h1 className="notlogin-slogan">商户管理系统</h1>
                <Button type='primary' onClick={() => Router.push('/seller/login')}>点击登录</Button>
                <WhiteSpace />
                <Button type='primary' onClick={() => Router.push('/seller/register')}>没有帐户？加入我们</Button>
            </div>
        </div>)
    }



    renderMyCommodities() {
        return (<div>
            <CommodityList />
        </div>)
    }

    renderNewCommodity() {
        return (<div>
            <List renderHeader={() => '商品图片(第一张为准）'}>
                <List.Item>
                    <ImagePicker
                        files={this.state.newCommodityImg}
                        onChange={(files) => this.onNewCommodityImgChange(files)}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        multiple={false}
                        style={{ width: "100%" }}
                    />
                </List.Item>
            </List>
            <WhiteSpace />
            <List renderHeader={() => '商品基本信息'} >
                <TextareaItem
                    title="商户名"
                    placeholder="输入商品名称"
                    clear={this.state.clear}
                    onChange={(val) => { this.onNewCommodityNameChange(val) }}
                />
                <TextareaItem
                    title="商品简介"
                    placeholder="输入商品简介"
                    clear={this.state.clear}
                    onChange={(val) => { this.onNewCommodityIntroductionChange(val) }}
                />
                <InputItem
                    type="money"
                    placeholder="输入商品价格"
                    clear={this.state.clear}
                    onChange={(val) => { this.onNewCommodityPriceChange(val) }}
                >商品价格</InputItem>
                <Button onClick={this.addNewCommodity}>提交</Button>
            </List>
        </div >)
    }



    renderMySeller() {

        return (<div>
            <List renderHeader={() => '我的商户头像(第一张为准)'}>
                <List.Item>
                    <ImagePicker
                        files={this.state.newSellerAvatar}
                        onChange={(files) => this.onNewSellerAvatarChange(files)}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        multiple={false}
                        style={{ width: "100%" }}
                    />
                    <Button onClick={this.changeSellerAvatar}>修改头像</Button>
                </List.Item>
            </List>
            <WhiteSpace />
            <List renderHeader={() => '我的商户名称'} >
                <TextareaItem
                    title="商户名"
                    placeholder={this.state.sellerName}
                    onChange={(val) => { this.onNewSellerNameChange(val) }}
                />
                <Button onClick={this.changeSellerName}>提交</Button>
            </List>
            <WhiteSpace />
            <List renderHeader={() => '商户简介'}>
                <TextareaItem
                    title="商户简介"
                    placeholder="15字以内"
                    autoHeight={true}
                    onChange={(val) => this.onIntroductionChange(val)}
                />
                <Button onClick={this.changeIntroduction}>修改商户简介</Button>
            </List>
            <WhiteSpace />
            <List renderHeader={() => '修改登陆密码'}>
                <InputItem
                    type='password'
                    placeholder="原密码"
                    onChange={(val) => { this.onPasswordChange(val) }}
                >原密码</InputItem>
                <InputItem
                    type="password"
                    placeholder="请输入新密码"
                    onChange={(val) => { this.onNewPassword1Change(val) }}
                >新密码</InputItem>
                <InputItem
                    type="password"
                    placeholder="请再次输入新密码"
                    onChange={(val) => { this.onNewPassword2Change(val) }}
                >新密码</InputItem>
                <Button onClick={this.changePassword}>修改登陆密码</Button>
            </List>
        </div>)
    }

    renderMyOrders() {
        return(<div>
            <SellerOrderList />
        </div>)
    }

    renderHome() {
        if (this.state.loginStatus == 0) {
            return this.notLoginPage();
        }
        return (<div>
            <NavBar
                icon={<Icon type="ellipsis" />}
                onLeftClick={this.onOpenChange}
            >
                商户管理系统
        </NavBar>
            <Drawer
                className="my-drawer"
                style={{ minHeight: this.state.minHeight }}
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebar={this.sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
                {this.renderPage()}
            </Drawer>
        </div>)

    }


    render() {
        switch (this.state.changePasswordStatus) {
            case 0: alert('修改失败', '密码不正确', [{ text: 'Ok', onPress: () => console.log('password wrong') }]); this.setState({ changePasswordStatus: 1 }); break;
            case 2: alert('修改失败', '密码至少6位', [{ text: 'Ok', onPress: () => console.log('password short') }]); this.setState({ changePasswordStatus: 1 }); break;
            case 3: alert('修改失败', '两次输入密码不一致', [{ text: 'Ok', onPress: () => console.log('password not same') }]); this.setState({ changePasswordStatus: 1 }); break;
        }
        return (<div>
            {this.renderHome()}
        </div>
        )
    }

}


export default SellerHome;