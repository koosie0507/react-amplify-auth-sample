import axios from 'axios';
import React from 'react'
import {Auth} from "aws-amplify";

const API_BASE_URL = "https://ydtva8nig1.execute-api.us-east-1.amazonaws.com/v1"
const apiClient = axios.create({
    baseURL: API_BASE_URL
})

const Locker = ({id, location, code, locked}) => (
    <tr>
        <td>{id}</td>
        <td>{location}</td>
        <td>{code}</td>
        <td><input type={"checkbox"} checked={locked}/></td>
    </tr>
);

const LockerTable = ({lockers}) => {
    return (
        <table>
            <thead>
            <tr>
                <td>ID</td>
                <td>Location</td>
                <td>Code</td>
                <td>Is it locked?</td>
            </tr>
            </thead>
            <tbody>
            {lockers.map(locker => (<Locker key={locker.id} {...locker}/>))}
            </tbody>
        </table>
    )
}

export class Home extends React.Component {
    constructor(props) {
        super(props);
        const {userToken} = props;
        apiClient.interceptors.request.use(
            config => {
                config.headers.common = Object.assign(config.headers.common, {
                    "Authorization": `Bearer ${userToken}`
                })
                return config;
            }
        )
        this.state = {
            user: {},
            lockers: [],
            signOut: {}
        }
    }

    componentDidMount() {
        Auth.currentSession().then(result => {
            this.setState({
                user: result
            })
        })
        apiClient.get("/lockers").then(result => this.setState(
            { lockers: result.data }
        )).catch(console.log)
    }

    render() {
        return (
            <>
                <header>
                    <nav>
                        <h1>Welcome {this.state.user.username}</h1>
                        <button onClick={this.props.signOut}>Sign Out</button>
                    </nav>
                </header>
                <main>
                    <p>Here ya go. Have some lockers!</p>
                    <LockerTable lockers={this.state.lockers}/>
                </main>
            </>
        )
    }
}