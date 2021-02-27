import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col, Space, Card, Typography, List, Button, Menu, Dropdown, Popover, Image, message } from 'antd'
import { PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { getListData, unmoutListData, addMovieToList } from '../redux/actions/movieListAction'
import { IMAGE_URL } from '../config';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { Headers, Loading } from '../components';
import { getMyList } from '../redux/actions/myListAction';

const { Paragraph } = Typography;
const { Meta } = Card;

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      loadingList: false,
      hasMore: true
    }
  }

  componentDidMount() {
    const { page } = this.state;
    const { actionGetListData, actionGetMyList } = this.props;
    return actionGetListData(page) && actionGetMyList('listGroup')
  }

  componentWillUnmount(){
    const { actionUnmoutListData } = this.props;
    this.setState({ page: this.state.page })
    return actionUnmoutListData();
  }

  handleInfiniteOnLoad = () => {
    const { actionGetListData } = this.props;
    this.setState({ loadingList: true })
    this.setState((prevState) => {
      const newPage = prevState.page + 1 
      prevState.loadingList = false
      actionGetListData(newPage);
      return { 
        page: newPage
      }
    })
  }

  handleMovieToList = (item, movie) => {
    const { actionAddMovieToList, actionGetListData } = this.props;
    const { page } = this.state;
    const newValue = {
      ...movie,
      uidGroup: item.uid
    }
    return actionAddMovieToList(newValue, () => {
      // return this.setState({ isModalVisible: false, listInput: null }, () => {
        message.success('Success add movie to list')
        return actionGetListData(page)
      // })
    }, (err) => {
      message.error('Movie already exist in list')
      // return this.setState({ isModalVisible: false }, () => message.error(err))
    })
  }
    
  render() {
    const { loading, data, listData } = this.props;
    const { loadingList, hasMore } = this.state;
    const menu = (movie) => (
      <Menu style={{ border: 0 }}>
        {
          listData && listData.map(item => {
            return(
              <Menu.Item key={item.uid} onClick={() => this.handleMovieToList(item, movie)}>
                  {`Add to: ${item.name}`}
              </Menu.Item>
            )
          })
        }
      </Menu>
    );

    if(loading){
      return( <Headers> <Loading /> </Headers> )
    }
    return (
      <React.Fragment>
        <Headers>
          <div className="infinite-container">
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={() => this.handleInfiniteOnLoad()}
              hasMore={!loadingList && hasMore}
              // useWindow={true}
              loader={<Loading key={0} />}
            >
            <List
                grid={{
                  gutter: 32,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                  // column: 4
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <Card
                      style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} 
                      bodyStyle={{ padding: 20 }}
                      cover={
                        <React.Fragment>
                          <Image preview={false} src={`${IMAGE_URL}/${item.poster_path}`} />
                          <Popover placement="bottomRight" content={menu(item)} trigger="click">
                            <Button 
                              type="primary" 
                              shape="circle" 
                              icon={<PlusOutlined />} 
                              size='large' 
                              style={{ position: 'absolute', top: '7%', left: '85%', transform: 'translate(-50%, -50%)' }}
                            />
                          </Popover>
                        </React.Fragment>
                      }>
                        <Meta
                          title={ `${item.title} - ${moment(item.release_date).year()}` }
                          description={<Paragraph ellipsis={{rows: 2}}>{item.overview}</Paragraph>}
                        />
                    </Card>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Headers>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.listMovie.loading,
  data: state.listMovie.data,
  listData: state.myList.data
})

const mapDispatchToProps = {
  actionGetListData: getListData,
  actionUnmoutListData: unmoutListData,
  actionGetMyList: getMyList,
  actionAddMovieToList: addMovieToList
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
