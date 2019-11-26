import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from '../../../map/footer/footer';

describe('<Footer>', () => {
    it('renders without crashing', () => {
        const requests = [{fulfilled:true},{fulfilled:false},{fulfilled:false}]

        shallow(<Footer requests={requests}/>);
    });

    it('displays total requests as 2 when passed 2 unfulfilled requests', ()=> {
        const requests = [{fulfilled:true},{fulfilled:false},{fulfilled:false}]

        const footer = mount(<Footer requests={requests}/>);
        const total = footer.find('span').at(2).text()
        
        expect(total).toEqual('Total requests: 2')
    })

    it('renders a modal when clicking the add request button', () => {
        const requests = [{fulfilled:true},{fulfilled:false},{fulfilled:false}]

        const wrapper = mount(<Footer requests={requests}/>);
        const add = wrapper.find('#fab-add-button').at(0)
            
        add.simulate('click')
        const dialog = wrapper.find('WithStyles(Dialog)')
        
        expect(dialog.props().open).toEqual(true)
    })
})
