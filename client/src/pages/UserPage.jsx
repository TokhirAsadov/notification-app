import React, { useState,useEffect } from 'react';
import {Link, Route, Routes} from "react-router-dom";
import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import {Tabs, Layout, Menu, theme,  Button, Drawer } from 'antd';
import Card from "../components/permission/Card";
import History from "../components/permission/History";
import UserDashboard from "../components/user/UserDashboard";
import {BASE_URL, getHeaders, logOut} from "../utills/ServiceUrls";
import axios from "axios";
import Permissions from "../components/permission/Permissions";
import {useSelector} from "react-redux";
import SideHeader from "../components/header/SideHeader";

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
  const [count, setCount] = useState(5);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  useEffect(()=> {
    if (user) {
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
  },[user])





  return (

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
       {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "grid",
            gridTemplateColumns: "5rem auto",
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <div className={"container h-16 flex items-center justify-end gap-8"}>
            <Badge count={count}>
              <Avatar
                shape="square"
                size="large"
                icon={<BellOutlined/>}
                className={"flex items-center justify-center cursor-pointer"}
                onClick={showDrawer}
              />
            </Badge>

            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
              className={"mr-4"}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className={"border p-4 h-8 w-8 rounded-full flex items-center justify-center"}>
                  <UserOutlined className={"h-8 w-8 flex items-center justify-center"}/>
                </Space>
              </a>
            </Dropdown>

          </div>


        </Header>*/}

        <SideHeader showDrawer={showDrawer} />


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
                label: "Permission",
                component: <>
                  <Card createPost={createPost} title={"Card"} />
                  <Permissions posts={posts}/>
                </>
              },
              {
                key: 2,
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

  );
};

export default UserPage;