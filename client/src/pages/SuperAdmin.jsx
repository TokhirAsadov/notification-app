import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import SuperAdminDashboard from "../components/super/SuperAdminDashboard";
import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Tabs, Layout, Menu, theme, Drawer} from 'antd';
import History from "../components/permission/History";
import {BASE_URL} from "../utills/ServiceUrls";
import {useSelector} from "react-redux";
import SideHeader from "../components/header/SideHeader";
import Permissions from "../components/permission/Permissions";
import Notifications from "../components/permission/Notifications";

const { Content, Sider} = Layout;


const SuperAdmin = () => {

  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const [posts,setPosts] = useState([]);
  const user = useSelector(state => state?.user?.user)

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(()=> {
      const sse = new EventSource(BASE_URL + '/post/stream');

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
        >
          <Menu.Item key="1" icon={<UserOutlined/>}><Link to={"/super/dashboard1"}>Account Settings 1</Link></Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined/>}><Link to={"/super/dashboard2"}>Account Settings
            2</Link></Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined/>}><Link to={"/super/dashboard3"}>Account Settings
            3</Link></Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">

        <SideHeader showDrawer={showDrawer} collapsed={collapsed} setCollapsed={setCollapsed} user={user} />


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
                label: "Permissions",
                component: <>
                  {/*<Card createPost={createPost} title={"Card"} />*/}
                  <Permissions posts={posts}/>
                </>
              },
              {
                key: 3,
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