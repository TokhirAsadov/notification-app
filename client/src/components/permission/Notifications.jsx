import React from 'react';
import { Space } from 'antd';
import {useSelector} from "react-redux";
import {CloseOutlined} from "@ant-design/icons";

const Notifications = () => {
  const notifications = useSelector(state => state?.notification?.notification)
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {
        notifications && notifications?.map((notification,index) => (
          <div className={"container p-4 bg-blue-200 rounded-lg flex justify-between items-center relative"}>
            <div>
              {notification?.content}
            </div>
            <button className={"py-2 px-4 bg-white rounded mr-8"}>READ</button>
            <div className={"w-6 h-6 absolute top-1 right-1 bg-white rounded-full flex items-center justify-center text-xs text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition"}><CloseOutlined /></div>
          </div>
        ))
      }
    </Space>
  );
};

export default Notifications;