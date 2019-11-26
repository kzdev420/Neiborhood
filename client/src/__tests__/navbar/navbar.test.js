import React from 'react';
import { shallow, mount } from 'enzyme';
import { create } from 'react-test-renderer';
import NavBar from '../../navbar/navbar';


describe('<Navbar />', () => {
    it('renders without crashing', () => {
        shallow(<NavBar />);
    });

    it('renders a correct snapshot', () => {
        let wrapper = create(<NavBar />)
        expect(wrapper.toJSON()).toMatchSnapshot();
      })

    it('has a title', () => {
        let title = 'Request'
        let wrapper = mount(<NavBar title={title} />)
        expect(wrapper.find('h6').text()).toBe(title)
    });

})

