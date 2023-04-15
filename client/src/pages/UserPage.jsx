import React, { useState,useEffect } from 'react';
import {Link, Route, Routes} from "react-router-dom";
import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Tabs, Layout, Menu, theme, Drawer, Spin} from 'antd';
import Card from "../components/permission/Card";
import History from "../components/permission/History";
import UserDashboard from "../components/user/UserDashboard";
import {BASE_URL, getHeaders} from "../utills/ServiceUrls";
import axios from "axios";
import Permissions from "../components/permission/Permissions";
import {useSelector} from "react-redux";
import SideHeader from "../components/header/SideHeader";
import Notifications from "../components/permission/Notifications";

const { Content, Sider} = Layout;


const UserPage = () => {

  const [posts,setPosts] = useState([]);
  const user = useSelector(state => state?.user?.user)

  const {headers} = getHeaders();

  const createPost = (post) => {
    axios.post(BASE_URL+"/post/create",post,{headers})
      .then(res => {
        console.log(res,'create post')
      })
      .catch(err => {
        console.log(err,'err create post')
      })
  }

  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    user?.id && setLoading(false);
  },[user])

  useEffect(()=>{
    if (!loading) {
      const sse = new EventSource(BASE_URL + '/post/stream?userId=' + user?.id);

      sse.addEventListener("post-list-event", (event) => {
        const data = JSON.parse(event.data);
        console.log(data, "stream listener")
        setPosts(data)
      });
      sse.onerror = () => {
        sse.close();
      };
      return () => {
        sse.close();
      };
    }
  },[loading])

  return (

    <Spin spinning={loading} delay={500}>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            minHeight: "100vh"
          }}
        >
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<UserOutlined/>}><Link to={"/user/dashboard1"}>Account Settings 1</Link></Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined/>}><Link to={"/user/dashboard2"}>Account Settings
              2</Link></Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined/>}><Link to={"/user/dashboard3"}>Account Settings
              3</Link></Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">

          <SideHeader showDrawer={showDrawer} collapsed={collapsed} setCollapsed={setCollapsed} user={user} />


          <Routes>

            <Route path={"/user"} element={ <UserDashboard /> }/>

          </Routes>

          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>


        <Drawer width={500} title="Basic Drawer" placement="right" onClose={onClose} open={open}>


          <Tabs
            defaultActiveKey="2"
            items={
              [
                {
                  key: 1,
                  label: "Notifications",
                  component: <Notifications />
                },
                {
                  key: 2,
                  label: "Permission",
                  component: <>
                    <Card createPost={createPost} title={"Card"} />
                    <Permissions posts={posts}/>
                  </>
                },
                {
                  key: 3,
                  label: "History",
                  component: <History title={"History"} />
                }
              ]?.map((item,i) => (
                {
                  label: item?.label,
                  key: item?.key,
                  children: item?.component
                }
              ))
            }
          />


        </Drawer>

      </Layout>
    </Spin>


  );
};

export default UserPage;