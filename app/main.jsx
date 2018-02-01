import React from 'react';
import {render} from 'react-dom';
import Greeter from './greeter';
import Parse from 'parse';

Parse.initialize("yA5867167As");
Parse.serverURL = 'https://yow.herokuapp.com/parse';

render(<Greeter />, document.getElementById('root'));
