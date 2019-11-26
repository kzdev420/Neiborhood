import React from 'react';
import { reducer } from "../../redux/reducers";

describe('requests reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            requests: []
        })
    })

    it('should handle SET_REQUESTS', () => {
        const requests = [{id:1},{id:2},{id:3}]

        expect(
          reducer({}, {
            type: "SET_REQUESTS",
            payload: {
                requests: requests
            }
          })
        ).toEqual({
            requests: requests
        })

        expect(
            reducer({requests: [{id:4}]}, {
              type: "SET_REQUESTS",
              payload: {
                  requests: requests
              }
            })
          ).toEqual({
              requests: requests
          })
    })
})