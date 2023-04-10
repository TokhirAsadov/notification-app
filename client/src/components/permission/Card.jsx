import React from 'react';
import {Form, Input} from "antd";
import { UserOutlined} from "@ant-design/icons";
import { DatePicker } from 'antd';
import PermissionItem from "./PermissionItem";
const { TextArea } = Input;

const Card = ({createPost,title,key}) => {


  const onFinish = (values) => {
    console.log(values,"finished")
    createPost({...values,status:'AT_PROCESS'});
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  return (
    <div className={"container p-1"}>
      <Form
        name="basic"
        className={"flex flex-col items-center gap-1"}
        style={{ backgroundColor: "#b7eb8f" }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h3 className={"w-full mt-2 flex justify-center text-green-500 self-center text-xl mb-8"}>Create new object</h3>
        <Form.Item
          name="content"
          className={"flex justify-between"}
          rules={[
            {
              required: true,
              message: 'Please enter title!',
            },
          ]}
        >
          <Input className={"p-2 w-full"} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          className={"flex justify-between"}
          name="fromDate"
          rules={[
            {
              required: true,
              message: 'Please choose from date!',
            },
          ]}
        >
          <DatePicker className={"p-2 w-full"} showTime onChange={onChange} onOk={onOk} />
        </Form.Item>
        <Form.Item
          className={"flex justify-between"}
          name="toDate"
          rules={[
            {
              required: true,
              message: 'Please choose to date!',
            },
          ]}
        >
          <DatePicker className={"p-2 w-full"} showTime onChange={onChange} onOk={onOk} />
        </Form.Item>

        <Form.Item
          className={"flex justify-between"}
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter some description',
            },
          ]}
        >
          <TextArea className={"p-2 w-full"} showCount maxLength={200} />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button type="primary"  className={
            "self-center bg-green-500 hover:bg-green-700 px-4 py-1 text-white rounded"
          }>
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Card;