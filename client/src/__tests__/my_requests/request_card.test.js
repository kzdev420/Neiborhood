import React from 'react';
import RequestCard from '../../my_requests/request_card';
import { shallow, mount } from 'enzyme';

describe('<RequestCard />', () => {
    it('renders without crashing', () => {
        const fetchRequests = jest.fn()
        const request = {
            id: 1,
            created_at: '2019-08-11',
            request_category_id: 2
        }

        shallow(<RequestCard key={request.id} request={request} fetchRequests={fetchRequests} />)
    })

    it('disables the fulfill button if request is classed as fulfilled', () => {
        const fetchRequests = jest.fn()
        const request = {
            id: 1,
            created_at: '2019-08-11',
            request_category_id: 2,
            fulfilled: false,
            description: 'brief description'
        }

        const card = mount(<RequestCard key={request.id} request={request} fetchRequests={fetchRequests} />)
        const fulfilButton = card.find('Button').at(1)
        const repostButton = card.find('Button').at(0)
        expect(fulfilButton.props().disabled).toEqual(false)
        expect(repostButton.props().disabled).toEqual(true)
    })

    it('disables the repost button if request is classed as unfulfilled', () => {
        const fetchRequests = jest.fn()
        const request = {
            id: 1,
            created_at: '2019-08-11',
            request_category_id: 2,
            fulfilled: true,
            description: 'brief description'
        }

        const card = mount(<RequestCard key={request.id} request={request} fetchRequests={fetchRequests} />)
        const fulfilButton = card.find('Button').at(1)
        const repostButton = card.find('Button').at(0)
        expect(fulfilButton.props().disabled).toEqual(true)
        expect(repostButton.props().disabled).toEqual(false)
    })

    it('sends request fulfilled status update to server on fulfil button click', () => {
        const fetchRequests = jest.fn()
        const request = {
            id: 1,
            created_at: '2019-08-11',
            request_category_id: 2,
            fulfilled: false,
            description: 'brief description'
        }

        const card = mount(<RequestCard key={request.id} request={request} fetchRequests={fetchRequests} />)
    
        const mockSuccessResponse = {};
          const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
          const mockFetchPromise = Promise.resolve({ 
            json: () => mockJsonPromise,
          });
          jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    
        const fulfilButton = card.find('Button').at(1)
        fulfilButton.simulate('click')
        expect(global.fetch).toHaveBeenCalledTimes(1);
        global.fetch.mockClear();
      })

      it('sends request unfulfilled status update to server on repost button click', () => {
        const fetchRequests = jest.fn()
        const request = {
            id: 1,
            created_at: '2019-08-11',
            request_category_id: 2,
            fulfilled: false,
            description: 'brief description'
        }

        const card = mount(<RequestCard key={request.id} request={request} fetchRequests={fetchRequests} />)
    
        const mockSuccessResponse = {};
          const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
          const mockFetchPromise = Promise.resolve({ 
            json: () => mockJsonPromise,
          });
          jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    
        const repostButton = card.find('Button').at(1)
        repostButton.simulate('click')
        expect(global.fetch).toHaveBeenCalledTimes(1);
        global.fetch.mockClear();
      })
})