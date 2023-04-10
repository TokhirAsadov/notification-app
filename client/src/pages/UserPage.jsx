import React, { useState,useEffect } from 'react';
import {Link, Route, Routes} from "react-router-dom";
import SuperAdminDashboard from "../components/super/SuperAdminDashboard";
import {
  MenuFoldOutlined,
  MinusOutlined,
  PlusOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons';
import {Tabs, Layout, Menu, theme, Avatar, Badge, Button, Drawer} from 'antd';
import Card from "../components/permission/Card";
import History from "../components/permission/History";
import UserDashboard from "../components/user/UserDashboard";
import {BASE_URL, getHeaders} from "../utills/ServiceUrls";
import axios from "axios";
import PermissionItem from "../components/permission/PermissionItem";
import Permissions from "../components/permission/Permissions";

const {Header, Content, Sider} = Layout;

const ButtonGroup = Button.Group;

const UserPage = () => {

  const [posts,setPosts] = useState([]);

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

  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };

  useEffect(()=> {
    const sse = new EventSource(BASE_URL+'/post/stream');

    sse.addEventListener("post-list-event",(event) => {
      const data = JSON.parse(event.data);
      console.log(data,"stream listener")
      setPosts(data)
    });
    sse.onerror = () => {
      sse.close();
    };
    return () => {
      sse.close();
    };
  },[])





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
          /*items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}*/
        >
          <Menu.Item key="1" icon={<UserOutlined/>}><Link to={"/user/dashboard1"}>Account Settings 1</Link></Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined/>}><Link to={"/user/dashboard2"}>Account Settings
            2</Link></Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined/>}><Link to={"/user/dashboard3"}>Account Settings
            3</Link></Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
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

          <div className={"container flex py-1 items-center justify-end gap-8"}>
            <Badge count={count}>
              {/*<BellOutlined  />*/}
              <Avatar
                shape="square"
                size="large"
                icon={<BellOutlined/>}
                className={"flex items-center justify-center cursor-pointer"}
                onClick={showDrawer}
              />
            </Badge>

            <ButtonGroup>
              <Button onClick={decline} icon={<MinusOutlined/>}/>
              <Button onClick={increase} icon={<PlusOutlined/>}/>
            </ButtonGroup>

          </div>


          {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*/}

        </Header>


        <Routes>

          {/*<Route path={"/dashboard"} element={<SuperAdminDashboard/>}/>*/}
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
                  <Card createPost={createPost} key={1} title={"Card"} />
                  <Permissions posts={posts}/>
                </>
              },
              {
                key: 2,
                label: "History",
                component: <History key={2} title={"History"} />
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