import fetch from 'isomorphic-unfetch'
import MyTabBar from '../components/Tab'

const Home = props => (
    <div>
        <h1>Hello, Next.js</h1>
        <h2>{props.userName}</h2>
        <MyTabBar selectedTab="homeTab" />
    </div>
);

Home.getInitialProps = async function() {
    const res = await fetch('http://127.0.0.1:8081/api/userdata?userId=001', {
        method:'GET',
    });
    const data = await res.json();
    console.log(data)

    return {
        userName:data.data.userName 
    }
}

export default Home;