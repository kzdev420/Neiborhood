import React from 'react';
import Messages from '../../inbox/messages';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import Cookies from 'js-cookie';

describe('<Messages />', () => {
    it('renders without crashing', () => {
        const messages = [{text: 'hi', id: 1}, {text: 'hello', id: 2}]
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');
        
      shallow(<Messages messages={messages} />);
    });

    it('renders a correct snapshot', () => {
        const data = [{text: 'hi', id: 1}, {text: 'hello', id: 2}]
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

        let messages = create(<Messages messages={data}/>)
        expect(messages.toJSON()).toMatchSnapshot();
      })

    it('renders a list of messages as long as the number of message in the props', () => { 
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

        const messages = [{text: 'hi', id: 1}, {text: 'hello', id: 2}]
        const wrapper = shallow(<Messages messages={messages} />);

        expect(wrapper.find('div.message')).toHaveLength(2)
    })
})