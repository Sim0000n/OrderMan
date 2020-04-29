import Router from "next/router";
import '../public/css/search.css'
import MyNavBar from '../components/MyNavBar'
import SearchList from '../components/SearchList'

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: 'not good',
        }
    }

    static getInitialProps({query}) {
        return {query};
    }

    render() {
        console.log("argu"+this.props.query.q)
        return (<div>
            <MyNavBar />
            <SearchList keyword={this.props.query.q}/>
        </div>)
    }
}

export default Search;