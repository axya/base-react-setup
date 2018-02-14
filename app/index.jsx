import React, {Component} from 'react';
import {render} from 'react-dom';
import Greeter from './greeter';

import Parse from 'parse';

Parse.initialize("yA5867167As");
Parse.serverURL = 'https://yow.herokuapp.com/parse';


const Message = Parse.Object.extend('Message');
const query = new Parse.Query(Message);

export const fetchMessages = () => {
    return query.find().then(
        results => getMessagesFromResult(results),
        error => ({error})
    )
};

const getMessagesFromResult = (result) => ({list: result.filter(object => { return !!object }).map(object => getMessageFromObject(object))});
const getMessageFromObject = object => {
    if (!object) return {};
    return {
        content: object.get("content"),
        position: {
            longitude: object.get("position")._longitude,
            latitude: object.get("position")._latitude
        }
    }
};

class MessagesList extends Component
{
    state = { messages: []};

    componentWillMount() {
        fetchMessages().then((messages) => {
            this.setState({messages});
            console.log('messages', messages);
        });
    }

    render() {
        const {messages} = this.state;
        return(
            <ul>
                {
                    messages && messages.list &&
                        messages.list.map(
                            ({content, position:{latitude, longitude}}) =>
                                (
                                    <li key={`${content} + ${latitude} + ${longitude}`}>
                                        <div>content: {content}</div>
                                        <div>latitude: {latitude}</div>
                                        <div>longitude: {longitude}</div>
                                    </li>
                                )
                        )
                }
                </ul>);
    }
}


render(<MessagesList />, document.getElementById('root'));
