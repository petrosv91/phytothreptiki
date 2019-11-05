import React, { Component } from 'react';
import Projects from './Projects';
import SocialProfiles from './SocialProfiles';
import Title from './Title';
import profile from '../assets/myProfile.png';

class App extends Component {

    state = { displayBio: false };

    toggleDisplayBio = () => {
        
        this.setState({ displayBio: !this.state.displayBio }); 
    }

    render() {

        const bio = this.state.displayBio ? (
            <div>
                <p>I live in Athens, and code every day.</p>
                <p>My favourite language is JavaScript, and i think React.js is awesome.</p>
                <p>Besides coding, I also love music and ramen!</p>

                <button onClick={this.toggleDisplayBio}>Show Less</button>
            </div>
        ) : (
            <div>
                <button onClick={this.toggleDisplayBio}>Read More</button>
            </div>
        );

        return (
            <div>
                <img src={profile} alt='profile-pic' className='profile-pic'/>
                <h1>Hello!</h1>
                <p>My name is petros.</p>
                { this.state.displayBio ? <Title /> : null }
                <p>I'm always looking forward to working on meaningful projects.</p>
                {bio}
                <hr />
                <Projects />
                <hr />
                <SocialProfiles />
            </div>
        )
    }
}

export default App; // share this Component with other files in the codebase