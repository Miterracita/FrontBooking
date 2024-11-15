import Nav from '../../components/Nav/Nav.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';

import './Home.css'


const Home = () => {
    return (
        <>
            <Nav />
            <Wrapper>
                <div className='c-home'>
                    <h1>Esta es la home</h1>
                </div>
            </Wrapper>
        </>
    );
};

export default Home;