import Router from 'next/router'
import { NavBar, Icon } from 'antd-mobile'

class MyNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLeftClick() {
        Router.push('/error', '/')
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleLeftClick}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >OrderMan</NavBar>
            </div>
        );
    }
}

export default MyNavBar;