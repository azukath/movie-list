import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Content, Header } = Layout;

export default class Headers extends Component {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Header style={{ margin: '0px 300px', padding: 0 }}>
          <Menu theme='light' mode="horizontal">
            <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/">Discover</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/my-list">My List</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '50px 300px', overflow: 'initial' }}>
          {children}
        </Content>
      </Layout>
    )
  }
}
