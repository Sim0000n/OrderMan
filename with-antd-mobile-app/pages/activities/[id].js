import MyNavBar from '../../components/MyNavBar'

class Activity extends React.Component {
    constructor(props) {
        super(props);
    }

    static getInitialProps({query}) {
        return {query}
    }

    render() {
        return(<div>
            <MyNavBar />
            <a>
                {this.props.query.id}
            </a>
        </div>)
    }
}

export default Activity;