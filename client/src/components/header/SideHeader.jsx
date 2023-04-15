import React,{useEffect,useState} from 'react';
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";
import {BASE_URL, logOut} from "../../utills/ServiceUrls";
import {Avatar, Badge, Dropdown, Layout, Space, Spin, theme} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fetchNotification} from "../../redux/actions/notification/notification_action";


const { Header } = Layout;


const SideHeader = ({showDrawer,collapsed,setCollapsed,user}) => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const items = [
    {
      label: "Settings",
      icon: <SettingOutlined /> ,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <button onClick={logOut}>Log out</button>
      ),
      icon: <LogoutOutlined /> ,
      key: '2',
    },
  ];

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    console.log(user?.id,"user")
    user?.id && setLoading(false);
  },[user])

  useEffect(()=>{
    console.log(loading,"loading change")
    if (!loading) {
      const sse = new EventSource(BASE_URL + '/notification/stream?userId=' + user?.id);

      sse.addEventListener("user-list-event", (event) => {
        const data = JSON.parse(event.data);

        dispatch(fetchNotification(data))

        console.log(data, "notification stream listener")

      });
      sse.onerror = () => {
        sse.close();
      };
      return () => {
        sse.close();
      };
    }
  },[loading])


  const notification = useSelector(state => state?.notification?.notification) || [];

  return (
    <Spin spinning={loading} delay={500}>
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

        <div className={"container h-16 flex items-center justify-end gap-8"}>
          <Badge count={notification?.length}>
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


      </Header>
    </Spin>
  );
};

export default SideHeader;