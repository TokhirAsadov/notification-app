import React from 'react';
import {Form, Input} from "antd";
import { UserOutlined} from "@ant-design/icons";
import { DatePicker } from 'antd';
import {motion as m} from "framer-motion";

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
    <m.div className={"container p-1"}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.7 }}
    >
      <Form
        name="basic"
        className={"flex flex-col items-center gap-1 p-4"}
        style={{ backgroundColor: "#b7eb8f" }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h3 className={"w-full mt-4 flex justify-center text-green-500 self-center text-2xl mb-4"}>Create new object</h3>
        <Form.Item
          name="content"
          className={"w-full flex justify-center"}
          rules={[
            {
              required: true,
              message: 'Please enter title!',
            },
          ]}
        >
          <Input className={"p-2 w-80"} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          className={"w-full flex justify-center"}
          name="fromDate"
          rules={[
            {
              required: true,
              message: 'Please choose from date!',
            },
          ]}
        >
          <DatePicker className={"p-2 w-80"} showTime onChange={onChange} onOk={onOk} />
        </Form.Item>
        <Form.Item
          className={"w-full flex justify-center"}
          name="toDate"
          rules={[
            {
              required: true,
              message: 'Please choose to date!',
            },
          ]}
        >
          <DatePicker className={"p-2 w-80"} showTime onChange={onChange} onOk={onOk} />
        </Form.Item>

        <Form.Item
          className={"w-full flex justify-center"}
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter some description',
            },
          ]}
        >
          <TextArea className={"w-80"} row={6} showCount maxLength={200} style={{ height: 120 }}  />
        </Form.Item>



          <button type="primary"  className={
            "self-center bg-green-500 hover:bg-green-700 px-4 py-1 text-white rounded mb-4"
          }>
            Submit
          </button>
      </Form>
    </m.div>
  );
};

export default Card;