import { Carousel } from "antd-mobile";
import Link from 'next/link'

class MyCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ["1", "2", "3"],
            imgHeight: 175,
            width: document.documentElement.clientWidth
        }
    }

    async componentDidMount() {

    }

    render() {
        return (<div style={{width: this.state.width}}>
            <Carousel
                autoplay="true"
                infinite="true"
                className="space-carousel"
                cellSpacing={10}
                slideWidth={0.8}
            >
                {this.state.id.map(val => (
                    <Link href="/activities/[val]" as={`/activities/${val}`}>
                        <a
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                                <img
                                    src={`http://localhost:8081/image/${val}.jpg`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top'}}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                        </a>
                    </Link>
                ))}
            </Carousel>
        </div>)
    }
}

export default MyCarousel;