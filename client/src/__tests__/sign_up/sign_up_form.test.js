import React from 'react';
import SignUpForm from '../../sign_up/sign_up_form';
import { shallow, mount } from 'enzyme';

describe('<SignUpForm>', () => {
  it('renders without crashing', () => {
      const wrapper = shallow(<SignUpForm />);

      expect(wrapper.find('form')).toBeDefined();
    });

    it('Should capture first name correctly onChange', () => {
      const wrapper = mount(<SignUpForm />);
      const input = wrapper.find('input').at(0);
      input.instance().value = 'John';
      input.simulate('change');
      expect(wrapper.state().first_name).toEqual('John');
      wrapper.unmount();
    })
})