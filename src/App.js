import React, { Component } from 'react'
import { Layout, Row, Col, Space, Card, Typography, List, Button } from 'antd'
import { SmileTwoTone, HeartTwoTone, PlusOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default class App extends Component {
  render() {
    const data = [
      {
        title: 'Title 1',
      },
      {
        title: 'Title 2',
      },
      {
        title: 'Title 3',
      },
      {
        title: 'Title 4',
      },
      {
        title: 'Title 5',
      },
      {
        title: 'Title 6',
      },
    ];

    return (
      <React.Fragment>
        <Content style={{ padding: '0px 100px', overflow: 'initial' }}>
          {/* <Row gutter={[32, 32]}>
              {
                new Array(20).fill('Judul Film Terbaru 2020').map((item, index) => (
                  <Col key={index} sm={12} md={6}>
                    <Card
                      style={{ borderRadius: 10 }} 
                      cover={
                        <>
                          <SmileTwoTone />
                          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                        </>
                      }>
                      <Title level={3}>{item}</Title>
                      <Paragraph ellipsis={{rows: 2}}>
                        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                        Design, a design language for background applications, is refined by Ant UED Team. Ant
                        Design, a design language for background applications, is refined by Ant UED Team. Ant
                        Design, a design language for background applications, is refined by Ant UED Team. Ant
                        Design, a design language for background applications, is refined by Ant UED Team. Ant
                        Design, a design language for background applications, is refined by Ant UED Team.
                      </Paragraph>
                    </Card>
                  </Col>
                ))
              }
          </Row> */}
          <List
            grid={{
              gutter: 32,
              xs: 2,
              sm: 2,
              md: 6,
              lg: 6,
              xl: 4,
              // xxl: 3,
              // column: 4
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                {/* <Card title={item.title}>Card content</Card> */}
                <Card
                  style={{ borderRadius: 10 }} 
                  // extra={
                    // <PlusCircleOutlined style={{fontSize: 30}} />
                    // <Button type="primary" icon={<PlusCircleOutlined />} size='large' />
                  // }
                  cover={
                    <React.Fragment>
                      <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<PlusOutlined />} 
                        size='large' 
                        style={{ position: 'absolute', top: '5%', left: '190px' }}
                        onClick={() => console.log(item)}
                      />
                      <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </React.Fragment>
                  }>
                  <Title level={3}>{item.title}</Title>
                  <Paragraph ellipsis={{rows: 2}}>
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
                  </Paragraph>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </React.Fragment>
    )
  };
};
