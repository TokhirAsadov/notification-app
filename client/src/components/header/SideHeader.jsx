import React,{useState} from 'react';
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";
import {logOut} from "../../utills/ServiceUrls";
import {Avatar, Badge, Dropdown, Layout, Space, theme} from "antd";


const { Header } = Layout;


const SideHeader = ({showDrawer}) => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [count, setCount] = useState(5);

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
  return (
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


      </Header>
  );
};

export default SideHeader;