import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import App from '../../../src/components/App';
import { NotificationContainer } from 'react-notifications';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let props;
  beforeEach(() => {
    props = {
      children: <body>sample children</body>
    };
  });

  it('Should check all the props', () => {
    const wrapper = shallow(<App {...props} />);
    const expectedChildren = '<NotificationContainer />sample children';
    expect(wrapper.find('div').text()).to.equal(expectedChildren);
  });

  it('Should have one <NotificationContainer /> component', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(NotificationContainer).length).to.equal(1);
  });
});