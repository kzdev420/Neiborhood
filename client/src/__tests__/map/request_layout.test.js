import React from 'react';
import { shallow, mount } from 'enzyme';
import { RequestsPage } from '../../map/requests_layout';
import RequestsMapContainer from '../../map/requests_map_container';
import Footer from '../../map/footer/footer';
import Navbar from '../../navbar/navbar';

describe('<RequestsPage>', () => {
    it('renders without crashing', () => {
        shallow(<RequestsPage />);
    })

    it('renders <Navbar> component', () => {  
        const wrapper = shallow(<RequestsPage />);
        const navbar = <Navbar title="Requests"/>

        expect(wrapper.contains(navbar)).toEqual(true);
    });

    it('renders <RequestsMapContainer> component', () => {  
        const requests = [
            {id: 1},
            {id: 2},
            {id: 3}
        ]
        const wrapper = shallow(<RequestsPage requests={requests}/>);
        const state = {userLocation: {lat: 51.515499, lng: -0.1419}}
        wrapper.setState(state)

        expect(wrapper.find('RequestsMapContainer')).toHaveLength(1)
    });

    it('renders <Footer> component', () => {  
        const props = {
            fetchRequests: () => {
              "function"
            },
            requests: [
                {fulfilled:true},{fulfilled:true},{fulfilled:false}
                ]
        }

        const wrapper = shallow(<RequestsPage requests={props.requests} />)
        //const component = <Footer {...props} />

        expect(wrapper.find('Footer')).toHaveLength(1)
    });
})