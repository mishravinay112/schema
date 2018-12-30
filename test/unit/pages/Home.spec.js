import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import Home from '../../../src/pages/Home';
import MyInfo from '../../../src/components/MyInfo';
import EmployeeTable from '../../../src/components/EmployeeTable';

configure({ adapter: new Adapter() });
describe('<Home />', () => {
  it('Should check all the classes ', () => {
    const wrapper = shallow(<Home />);
    const expectedClassName = 'container text-center';
    expect(wrapper.find({ className: 'container text-center' }).props().className).to.equal(expectedClassName);
  });

  it('Should have one <MyInfo /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(MyInfo).length).to.equal(1);
  });

  it('Should have one <EmployeeTable /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(EmployeeTable).length).to.equal(1);
  });

});