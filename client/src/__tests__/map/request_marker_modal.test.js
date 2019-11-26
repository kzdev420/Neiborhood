import React from 'react';
import { shallow, mount } from 'enzyme';
import RequestMarkerModal from '../../map/request_marker_modal';
import Cookies from 'js-cookie';

beforeEach(() => {
    Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');
  });

describe('<RequestMarkerModal>', () => {
    it('renders without crashing', () => {
        const props = {
            request: {
                request_category_id: 1
            }
        }

        shallow(<RequestMarkerModal {...props}/>);
    })

    it('displays the request type, description', () => {
        const props = {
            request: {
                request_category_id: 1,
                description: 'description',
                fulfilled: false,
                id: 1,
                user_id: 1
            }
        }
        const type = "One-time task"

        const wrapper = shallow(<RequestMarkerModal {...props}/>);
        const requestType = wrapper.find('WithStyles(Typography)').at(0)
        const description = wrapper.find('WithStyles(Typography)').at(1)

        expect(requestType.debug()).toContain(type)
        expect(description.debug()).toContain(props.request.description)
    })

    it('displays the requester name and replies number', () => {
        const props = {
            request: {
                request_category_id: 1,
                description: 'description',
                fulfilled: false,
                id: 1,
                user_id: 1
            },
            open: true
        }

        const wrapper = mount(<RequestMarkerModal {...props}/>);
        wrapper.setState({repliesNumber: 3, requestUserName: 'John Doe'})

        const replies = wrapper.find('h6').at(1).text()
        const name = wrapper.find('h2').at(0).text()

        expect(name).toEqual('John Doe')
        expect(replies).toEqual('Replies so far: 3')
    })

    it('Should capture response message correctly onChange', () => {
        const props = {
            request: {
                request_category_id: 1,
                description: 'description',
                fulfilled: false,
                id: 1,
                user_id: 1
            },
            open: true
        }

        const wrapper = mount(<RequestMarkerModal {...props}/>);
        const input = wrapper.find('#message').at(6);

        input.instance().value = 'Response message';
        input.simulate('change');
        expect(wrapper.state().message).toEqual('Response message');
        wrapper.unmount();
      })


    it('submits a request response and a new conversation to the server', () => {
        const props = {
            request: {
                request_category_id: 1,
                description: 'description',
                fulfilled: false,
                id: 1,
                user_id: 1
            },
            open: true
        }
        const state = {message: 'response'}
        const wrapper = mount(<RequestMarkerModal {...props}/>);
        wrapper.setState(state)

        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
        const mockFetchPromise = Promise.resolve({ 
        json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        wrapper.find('form').simulate('submit')
        expect(global.fetch).toHaveBeenCalledTimes(2);
        global.fetch.mockClear();
    })

})