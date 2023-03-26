import React, {useEffect} from 'react';
import { Form, Input} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useHttp} from "../hook/useHttp";
import {AUTH, BASE_URL, getHeaders, getToken, TOKEN, USER} from "../utills/ServiceUrls";
import {useDispatch} from "react-redux";
import {userFetched} from "../redux/slice/user/user_slice";
import jwtDecode from "jwt-decode";
import {fetchUser} from "../redux/actions/user/user_actions";
import {useNavigate} from "react-router";


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {request} = useHttp();

  const onFinish = (values) => {

    request(BASE_URL+AUTH.LOGIN, 'POST',JSON.stringify(values))
      .then(res => {
        dispatch(userFetched(res));

        // toast.success("Success login");
        localStorage.setItem(TOKEN, res.accessToken);
        const decode = jwtDecode(res.accessToken);
        dispatch(fetchUser(request))
        if( decode?.roles?.length > 1){
          //todo -------------- role lari kup bulsa tanlab site ga kiradigan qilish kk --------------------------------
        }
        else {
          let roleName = decode.roles[0].roleName;
          if (roleName === "ROLE_SUPER_ADMIN" ){
            navigate("/super/dashboard");
          }
          else if (roleName === "ROLE_ADMIN") {
            navigate("/admin/dashboard");
          }
          else if (roleName === "ROLE_EMPLOYEE") {
            navigate("/employee/dashboard");
          }
          else {
            navigate("/user/dashboard")
          }
        }
      })
      .catch(err => {
        console.log(err,"err come")
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {

    document.title = "Notification app by Tohir";

    const {headers} = getHeaders()
    const { token } = getToken();

    request(BASE_URL+USER.CHECK_ROLE,'GET',null, headers)
      .then(res => {
        if (res?.success){
          const decode = jwtDecode(token);

          if( decode?.roles?.length > 1){
            //todo -------------- role lari kup bulsa tanlab site ga kiradigan qilish kk --------------------------------
          }
          else {
            let roleName = decode.roles[0].roleName;
            if (roleName === "ROLE_SUPER_ADMIN" ){
              navigate("/super/dashboard");
            }
            else if (roleName === "ROLE_ADMIN") {
              navigate("/admin/dashboard");
            }
            else if (roleName === "ROLE_EMPLOYEE") {
              navigate("/employee/dashboard");
            }
            else {
              navigate("/user/dashboard")
            }
          }

        }
      })
      .catch(err => {
        console.log(err);
      })

  },[])


  return (
    <div className={"w-full h-96 grid justify-center  content-center "}>

      <div className={"container border p-8"}>
        <Form
          name="basic"
          className={"flex flex-col gap-1"}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h3 className={"w-full text-green-500 self-center text-xl mb-8"}>Login</h3>
          <Form.Item
            name="login"
            className={"flex justify-between w-full"}
            rules={[
              {
                required: true,
                message: 'Please input your login!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
          </Form.Item>

          <Form.Item
            className={"flex justify-between"}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
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
    </div>
  );
};

export default Login;