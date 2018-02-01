import Parse from 'parse';
import {Message} from './constants';

export const createMessage = (message) => {
    const position = new Parse.GeoPoint(message.position.location);
    const content = message.content;

    const newMessage = new Message();

    return newMessage.save({position, content}, {
        success: () => ({success: true}),
        error: (object, error) => ({error})
    });
};