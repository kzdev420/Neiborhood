import React from 'react';
import { shallow } from 'enzyme';
import SignUpPage from '../../sign_up/sign_up_layout' ;
import SignUpForm from '../../sign_up/sign_up_form';


describe('<SignUpPage>', () => {
  it('renders without crashing', () => {
      shallow(<SignUpPage />);
    });

    it('renders sign up form', () => {
      const history = '/history'
      const wrapper = shallow(<SignUpPage history={history}/>);
      const signUpForm = <SignUpForm history="/history"/>;

      //console.log(wrapper.debug())
      expect(wrapper.contains(signUpForm)).toEqual(true);
    });
})