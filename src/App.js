import {Authenticator, View} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // default theme
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <Authenticator.Provider>
            <View>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                            Learn React
                        </a>
                    </header>
                </div>
            </View>
        </Authenticator.Provider>
    );
}

export default App;
