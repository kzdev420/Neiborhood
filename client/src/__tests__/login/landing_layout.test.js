import React from 'react';
import LandingPage from '../../login/landing_layout';
import LogInForm from '../../login/log_in_form';
import { shallow, mount } from 'enzyme';

  describe('<LandingPage />', () => {
    it('renders without crashing', () => {
      const location = {state: '/location'}
      shallow(<LandingPage location={location} />);
    });
   
    it('renders <LogInForm> component', () => {
      const location = {state: '/location'}
      const wrapper = shallow(<LandingPage history="/history" location={location} />);
      const logInForm = <LogInForm history="/history" location="/location"/>

      expect(wrapper.contains(logInForm)).toEqual(true);
    });
   
  })