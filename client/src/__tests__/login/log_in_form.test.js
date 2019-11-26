import React from 'react';
import LogInForm from '../../login/log_in_form';
import { shallow, mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Cookies from 'js-cookie';

describe('<LogInForm>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LogInForm />);

    expect(wrapper.find('form')).toBeDefined();
  });

  
  it('renders a correct snapshot', () => {
    let form = create(<LogInForm />)
    expect(form.toJSON()).toMatchSnapshot();
  })


  it('Should capture email correctly onChange', () => {
    const wrapper = mount(<LogInForm />);
    const input = wrapper.find('input').at(0);
    input.instance().value = 'hello@email.com';
    input.simulate('change');
    expect(wrapper.state().email).toEqual('hello@email.com');
    wrapper.unmount();
  })


  it('Should submit the form data to the server', () => {
    Cookies.set = jest.fn()
    .mockImplementation(() => 'jwt');

    const state = {email:'hello@email.com', password:'hello'}
    const wrapper = mount(<LogInForm />);
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
