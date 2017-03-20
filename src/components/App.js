import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ClientList from './ClientList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Row>
          <Col span={24}>
            <ClientList />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
