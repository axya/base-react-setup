import Parse from 'parse';
import {Message} from './constants';

const query = new Parse.Query(Message);
let subscription;

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

export const subscribeMessages = (callback) => {
    subscription = query.subscribe();
    subscription.on('open', result => {
        console.log('subscribeMessages open', result);
        callback(getMessageFromObject(result));
    });
};

export const unsubscribeMessages = () => {
    subscription.unsubscribe();
};

export const receiveMessage = (callback) => {
    subscription.on('create', (result) => {
        console.log('receiveMessage', result);
        callback(getMessageFromObject(result))
    });
};
