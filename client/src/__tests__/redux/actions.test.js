import React from 'react';
import { setRequests } from '../../redux/actions';

describe('actions', () => {
    it('should create an action to add requests', () => {
        const requests = [{id:1}, {id:2}]
        const expectedAction = {
            type: "SET_REQUESTS",
            payload: {
                requests: requests
            }
        }
        expect(setRequests(requests)).toEqual(expectedAction)
    })
})