import React, {useEffect, useState} from 'react';
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
import {BASE_URL} from "../utills/ServiceUrls";

const {Header, Content, Sider} = Layout;

const ButtonGroup = Button.Group;

const SuperAdmin = () => {

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

  // useEffect(()=> {
  //   const sse = new EventSource(BASE_URL+'/post/stream');
  //
  //   sse.addEventListener("post-list-event",(event) => {
  //     console.log(event,"stream listener")
  //   });
  // },[])


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
          <Menu.Item key="1" icon={<UserOutlined/>}><Link to={"/super/dashboard1"}>Account Settings 1</Link></Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined/>}><Link to={"/super/dashboard2"}>Account Settings
            2</Link></Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined/>}><Link to={"/super/dashboard3"}>Account Settings
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


        </Header>


        <Routes>

          <Route path={"/dashboard"} element={<SuperAdminDashboard/>}/>
          {/*<Route path={"/user"} element={ <AdminUserAddPage /> }/>*/}

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


      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>


        <Tabs
          defaultActiveKey="2"
          items={
            [
              {
                key: 1,
                label: "Permission",
                component: <Card key={1} title={"Card"} />
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

export default SuperAdmin;