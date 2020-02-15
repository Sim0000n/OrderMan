import fetch from 'isomorphic-unfetch'
import MyTabBar from '../components/Tab'

const Home = props => (
    <div>
        <h1>Hello, Next.js</h1>
        <h2>{props.userName}</h2>
        <MyTabBar selectedTab="homeTab" />
    </div>
);


export default Home;