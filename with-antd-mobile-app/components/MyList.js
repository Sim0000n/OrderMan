import { List } from 'antd-mobile';
import Router from 'next/router'

const Item = List.Item;
const Brief = Item.Brief;

class MyList extends React.Component {
    state = {
        disabled: false,
    }

    render() {
        return (<div>
            <List className="my-list">
                <Item
                    arrow="horizontal"
                    thumb="/image/personal.svg"
                    multipleLine
                    onClick={() => {Router.push('/changePassword') }}
                >
                    修改密码<Brief>修改个人密码</Brief>
                </Item>
                {/* <Item
                    arrow="horizontal"
                    thumb="/image/star.svg"
                    multipleLine
                    onClick={() => { }}
                >
                    我的收藏 <Brief>光顾最爱的餐厅</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    thumb="/image/coupon.svg"
                    multipleLine
                    onClick={() => { }}
                >
                    我的优惠券 <Brief>使用现有优惠券享受优惠</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    thumb="/image/coupon.svg"
                    multipleLine
                    onClick={() => { }}
                >
                    我要投诉 <Brief>遇到不良商家？我们来帮你！</Brief>
                </Item> */}
            </List>
        </div>);
    }
}

export default MyList;