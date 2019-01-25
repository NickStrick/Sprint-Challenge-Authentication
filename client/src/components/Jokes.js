import React from 'react';
import axios from "axios";

class Jokes extends React.Component {
    state = {
        jokes: [],
    };

    componentDidMount() {
        const endpoint = `${process.env.REACT_APP_API_URL}/api/jokes`;
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                authorization: token,
            },
        };

        axios.get(endpoint, requestOptions)
            .then(res => {
                console.log(res);
                this.setState({
                    jokes: res.data
                })
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <>
                <h2>List of Users</h2>
                <ul>
                    {this.state.jokes.map(j => (
                        <li key={j.id}>{j.joke}</li>
                    ))}
                </ul>
            </>
        )
    }

}

export default Jokes;