import React from 'react';
import {Amplify} from 'aws-amplify';
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import {Home} from './Home';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);


const App = () => {
    const {route, user, signOut} = useAuthenticator(context => [context.route]);
    if (route !== "authenticated") {
        return (<Authenticator loginMechanisms={["email"]}/>)
    }
    let jwt = user.getSignInUserSession().getAccessToken().getJwtToken()
    return (<Home userToken={jwt} signOut={signOut}/>);
}

export default () => (
    <Authenticator.Provider>
        <App/>
    </Authenticator.Provider>
);