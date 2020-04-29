import { SearchBar } from "antd-mobile";
import Router from "next/router";

class MySearchBar extends React.Component {

    handleClick(value) {
        Router.push(`/search?q=${value}`)
    }
    
    render() {
        return (<div>
            <SearchBar placeholder="搜索" onSubmit={this.handleClick} onChange={this.handleChange} maxLength="10"></SearchBar>
        </div>)
    }
}

export default MySearchBar;