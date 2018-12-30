import React, { Component } from 'react';
import Meta from 'react-helmet';
import meta from '../util/meta/home-page';
import MyInfo from '../components/MyInfo';
import EmployeeTable from '../components/EmployeeTable';

export class Home extends Component {
  static getMeta() {
    return meta;
  }

  constructor(props) {
    super(props);
  }

  render() {
    const head = Home.getMeta();

    return (
      <div className="container text-center">
        <Meta title={head.title} description={head.description} link={head.link} meta={head.meta} />
        <MyInfo email="mishravinay112@gmail.com" name="Vinay Mishra" />
        <EmployeeTable />
      </div>
    );
  }
}

export default Home;
