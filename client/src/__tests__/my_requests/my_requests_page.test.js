import React from 'react';
import { MyRequestsPage } from '../../my_requests/my_requests_page';
import Navbar from '../../navbar/navbar';
import { shallow } from 'enzyme';

describe('<MyRequestsPage />', () => {
    it('renders without crashing', () => {

        shallow(<MyRequestsPage />)
    })

    it('renders <Navbar> component', () => {  
      const wrapper = shallow(<MyRequestsPage />);
      const navbar = <Navbar title="My Requests"/>
      expect(wrapper.contains(navbar)).toEqual(true);
    });

    it('renders <RequestCards> component', () => {  
        const wrapper = shallow(<MyRequestsPage requests={[{id: 1}, {id: 2}]}/>)
        expect(wrapper.find('RequestCards')).toHaveLength(1);
    });

})