import React from 'react';
import { shallow, mount } from 'enzyme';
import RequestModal from '../../../map/footer/request_modal';

describe('<RequestModal>', () => {
    it('renders without crashing', () => {
        const close = jest.fn()
        const fetchRequests = jest.fn()

        shallow(<RequestModal close={close} fetchRequests={fetchRequests} />)
    })

    it('renders the add request form', () => {
        const close = jest.fn()
        const fetchRequests = jest.fn()

        const wrapper = shallow(<RequestModal close={close} fetchRequests={fetchRequests} />)

        expect(wrapper.find('form')).toHaveLength(1)
    })

    it('Should capture text (address) correctly onChange', () => {
        const close = jest.fn()
        const fetchRequests = jest.fn()
        const wrapper = mount(<RequestModal open={true} close={close} fetchRequests={fetchRequests}/>);
        const input = wrapper.find('input').at(0);

        input.instance().value = '742 Evergreen Terrace';
        input.simulate('change');
        expect(wrapper.state().address).toEqual('742 Evergreen Terrace');
        wrapper.unmount();
      })

      it('Should submit the form data to the server', () => {
        const close = jest.fn()
        const fetchRequests = jest.fn()
        const state = {
            category: '1',
            location: {lat: 0, lng: 0},
            description: 'description of a problem'}
        const wrapper = mount(<RequestModal open={true} close={close} fetchRequests={fetchRequests}/>);
        wrapper.setState(state)
    
        const mockSuccessResponse = {};
          const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
          const mockFetchPromise = Promise.resolve({ 
            json: () => mockJsonPromise,
          });
          jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    
        wrapper.find('form').simulate('submit')
        expect(global.fetch).toHaveBeenCalledTimes(1);
        global.fetch.mockClear();
      })
})