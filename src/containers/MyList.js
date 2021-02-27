import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Col, Image, Input, List, message, Modal, Typography, Row, Menu } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Headers, Loading } from '../components'
import { addNewList, getMyList } from '../redux/actions/myListAction'
import { IMAGE_URL } from '../config';
import moment from 'moment';

const { Meta } = Card;
const { Paragraph } = Typography;

export class MyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      listInput: null
    }
  }

  componentDidMount() {
    const { actionGetMyList } = this.props;
    return actionGetMyList('listGroup')
  }

  // componentWillUnmount(){
  //   const { actionGetMyList } = this.props;
  //   // this.setState({ page: this.state.page })
  //   return actionGetMyList();
  // }

  showModal = () => {
    this.setState({ isModalVisible: true })
  }

  handleOk = () => {
    let { listInput } = this.state;
    let { actionAddNewList, actionGetMyList } = this.props;
    if(listInput){
      const newValue = {
        name: listInput
      }
      return actionAddNewList(newValue, () => {
        return this.setState({ isModalVisible: false, listInput: null }, () => {
          message.success('Success create new list')
          return actionGetMyList('listGroup')
        })
      }, (err) => {
        return this.setState({ isModalVisible: false }, () => message.error(err))
      })
    }else{
      message.error('Please input list name')
    }
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false, listInput: null })
  }

  handleInput = (value) => {
    this.setState({ listInput: value })
  }

  myListMovie = (id) => {
    console.log(id);
  }
  
  render() {
    const { isModalVisible, listInput } = this.state;
    const { listData, loading } = this.props;
    if(loading){
      return( <Headers> <Loading /> </Headers> )
    }
    return (
      <Headers>
        <Row gutter={12}>
          <Col md={6}>
            <Button icon={<PlusOutlined />} size='large' onClick={() => this.showModal()}>Create New List</Button>
            <Modal title="Create New List" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
              <Input value={listInput} onChange={(e) => this.handleInput(e.target.value)} placeholder='Insert List Name' style={{ width: '100%' }} />
            </Modal>
            <Menu style={{ marginTop: 20, marginLeft: 15 }}>
              {
                listData && listData.map(item => {
                  return(
                    <Menu.Item style={{ display: 'flex', justifyContent: 'space-between' }} key={item.uid} defaultSelectedKeys={[listData[0]['uid']]} onClick={() => this.myListMovie(item.uid)}>
                        {item.name} 
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Col>
          <Col md={18}>
            <List
              grid={{
                gutter: 32,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
              dataSource={[]}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Card
                    style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} 
                    bodyStyle={{ padding: 20 }}
                    cover={ <Image preview={false} src={`${IMAGE_URL}/${item.poster_path}`} /> }>
                      <Meta
                        title={ `${item.title} - ${moment(item.release_date).year()}` }
                        description={<Paragraph ellipsis={{rows: 2}}>{item.overview}</Paragraph>}
                      />
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Headers>
    )
  }
}

const mapStateToProps = (state) => ({
  listData: state.myList.data
})

const mapDispatchToProps = {
  actionGetMyList: getMyList,
  actionAddNewList: addNewList
}

export default connect(mapStateToProps, mapDispatchToProps)(MyList)
