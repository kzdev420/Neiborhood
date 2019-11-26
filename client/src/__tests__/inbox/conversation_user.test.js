import React from 'react';
import ConversationUser from '../../inbox/conversation_user';
import { shallow, mount } from 'enzyme';
import Cookies from 'js-cookie';
import { jssPreset } from '@material-ui/core';

describe('<ConversationUser>', () => {
    it('renders without crashing', () => {
        const conversation = {
            id: 1
        }

        shallow(<ConversationUser 
                key={conversation.id}
                conversation={conversation} 
                setConversationUser={1} 
                active={false}
            />)
    })

    it('on click calls the set conversation username function with state.userName', () => {
        const conversation = {
            id: 1
        }

        const setConversationUser = jest.fn()
        const click = jest.fn()

        const conversationUser = shallow(<ConversationUser 
                                key={conversation.id}
                                conversation={conversation} 
                                setConversationUser={setConversationUser} 
                                click={click}
                                active={false}
                            />)

        conversationUser.setState({
            userName: 'John Doe'
        })

        conversationUser.find('WithStyles(ListItem)').simulate('click')
        expect(setConversationUser.mock.calls.length).toEqual(1)
        expect(setConversationUser).toHaveBeenCalledWith('John Doe')
    })

    it('on click calls the click function, which fetches messages in parent, with conversation id prop', () => {
        const conversation = {
            id: 1
        }

        const setConversationUser = jest.fn()
        const click = jest.fn()

        const conversationUser = shallow(<ConversationUser 
                                key={conversation.id}
                                conversation={conversation} 
                                setConversationUser={setConversationUser} 
                                click={click}
                                active={false}
                            />)

        conversationUser.setState({
            userName: 'John Doe'
        })

        conversationUser.find('WithStyles(ListItem)').simulate('click')
        expect(click.mock.calls.length).toEqual(1)
        expect(click).toHaveBeenCalledWith(conversation.id)
    })
})