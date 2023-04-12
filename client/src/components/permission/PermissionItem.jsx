import React, {useState} from 'react';
import {
  CommentOutlined,
  MoreOutlined,
  DeleteOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  SendOutlined,
  CloseCircleOutlined,
   CheckCircleOutlined
} from '@ant-design/icons';
import moment from "moment";
import {Input, Button, Divider, Dropdown, Space, theme } from "antd";
import axios from "axios";
import {BASE_URL, getHeaders} from "../../utills/ServiceUrls";
import {useSelector} from "react-redux";
import { motion as m } from "framer-motion";
const { useToken } = theme;

const PermissionItem = ({permissionPostId,content,status,description,createdAt,updatedAt,createdBy,updatedBy,fromDate,toDate,commits,owner}) => {

  const user = useSelector(state => state?.user?.user);
  const role = user?.roles?.find(i=>i?.roleName==="ROLE_USER");
  const [openAllData,setOpenAllData] = useState(false);
  const [openCommits,setOpenCommits] = useState(false);
  const [commitObj,setCommitObj] = useState({
    permissionPostId,
    commit: ''
  });
  const {headers} = getHeaders();

  const submitCommit = (commit) => {
    commit?.commit !=='' && axios.post(BASE_URL+"/post/commit",commit,{headers})
      .then(res => {
        setCommitObj(prevState => ({...prevState,commit: ''}))
      })
      .catch(err =>{
        console.log(err,'post commit error..')
      })
  }

  const deleteCommit = (postId,commitId) => {
    axios.delete(BASE_URL+"/post/commit/"+commitId+"?postId="+postId,{headers})
      .then(res => {
        console.log(res,"deleted success fully..")
      })
      .catch(err => {
        console.log(err," deleted commit error..")
      })
  }

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };


  return (
    <m.div layout key={permissionPostId} className={"container bg-white border p-4 rounded-lg"}>
      <m.div layout className={"container flex justify-between"}>
        <div className={"container flex items-center justify-between"}>
          <div>{content}</div>
          <div className={"w-8 h-8 flex items-center justify-center hover:bg-gray-200 mr-8 cursor-pointer rounded-full transition"} onClick={()=> setOpenAllData(prevState => !prevState)}><MoreOutlined/></div>
        </div>

        <Dropdown
          dropdownRender={(menu) => (
            <div style={contentStyle}>
              <Divider style={{ margin: 0 }} />
              <Space style={{ padding: 8 }} className={"flex gap-2 w-56 justify-between py-4 px-8"}>
                <button className={"flex items-center justify-center bg-green-500 hover:bg-green-600 focus:bg-green-400 py-2 px-4 text-white rounded"}><CheckCircleOutlined className={"mr-1"}/> SUCCESS</button>
                <button className={"flex items-center justify-center bg-red-500 hover:bg-red-600 focus:bg-red-400 py-2 px-4 text-white rounded"}><CloseCircleOutlined className={"mr-1"} /> REJECT</button>
              </Space>
            </div>
          )}
        >
          <button className={`text-gray-600 rounded p-2 text-gray-600 ${status ==='AT_PROCESS' ? 'bg-yellow-300' : status ==='SUCCESS' ? 'bg-green-500': 'bg-red-500'} ${role ? 'cursor-not-allowed':"cursor-pointer"}`}>{status}</button>
        </Dropdown>


      </m.div>
      {/*todo------------------ tuliq barcha ma`lumotlarni chiqarish kk --------------------*/}
      {
        openAllData && <m.div className={"container flex flex-col gap-1 mt-4 rounded bg-gray-100 p-4 transition"}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              layout
        >
            <m.div layout className={"container flex justify-between text-xs"}>
              <div className={"flex align-middle justify-center gap-1"}><CalendarOutlined style={{ width:'16px',height:'16px', display:'flex', alignItems:'center',justifyContent:'center' }} /> {moment(new Date(fromDate)).format('HH:mm:ss DD-MM-YYYY')}</div>
              <ArrowRightOutlined style={{ width:'16px',height:'16px', display:'flex', alignItems:'center',justifyContent:'center' }} />
              <div className={"flex align-middle justify-center gap-1"}><CalendarOutlined style={{ width:'16px',height:'16px', display:'flex', alignItems:'center',justifyContent:'center' }} /> {moment(new Date(toDate)).format('HH:mm:ss DD-MM-YYYY')}</div>
            </m.div>
            <m.hr layout className={"w-full bg-white border-0 mt-1 "} style={{ height: '1px' }}/>

            <m.div layout className={"text-justify"}>{description}</m.div>
        </m.div>
      }
      {!openAllData && <m.hr layout className={"w-32"}/>}

      <m.div layout className={"container flex items-center mt-4 "}>
        <div className={"w-8 h-8 flex items-center justify-center p-2 text-lg rounded-full hover:bg-gray-200 cursor-pointer transition"} onClick={() => setOpenCommits(prevState => !prevState)}>
          <CommentOutlined />
        </div>
        <div className={"w-4 h-4 flex items-center justify-center text-xs ml-1"}>{commits?.length > 0 ? commits?.length : 0}</div>
      </m.div>

      {
        openCommits && <m.div initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              layout
                              className={"container flex flex-col gap-1 rounded bg-gray-100 p-4 transition"}
          style={{
            transition: "transform 0.5s, width 0.5s,height 0.5s",
            transitionDelay: "1s, 0.5s, 0.5s",
            transitionTimingFunction: "cubic-bezier(0.075, 0.82, 0.165,1)"
          }}
        >
          <m.div layout className={"container flex gap-2"}>
            <div className={"flex items-center justify-center text-xs"}>Commit:</div>
            <Input name={"commit"} value={commitObj?.commit} placeholder="Commit..." onChange={(e) => setCommitObj(prevState => ({...prevState,commit: e.target.value}))}/>
            <button onClick={() => submitCommit(commitObj)} className={"p-2 flex items-center justify-center rounded text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition text-xs"}><SendOutlined /></button>
          </m.div>
          {openCommits  && commits?.length > 0  && <m.hr layout className={"w-full bg-white border-0 mt-1"} style={{ height: '1px' }}/>}
          {
            commits?.sort(function(o1,o2){
              if (o1?.createdAt>o2?.createdAt)    return 1;
              else if(o1?.createdAt<o2?.createdAt) return  -1;
              else  return  0;
            })?.map((commit,index) => <m.div layout key={index} className={"container flex italic items-center justify-between"}>
              <div>
                {user?.id===commit?.createdBy ? "you: " : role ? "admin: " : "user: "}{commit?.content}
              </div>
              {
                user?.id===commit?.createdBy && <button onClick={()=>deleteCommit(permissionPostId,commit?.id)} className={"w-8 h-8 flex items-center justify-center p-1 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition "}><DeleteOutlined /></button>
              }
            </m.div>)
          }
        </m.div>
      }

      <m.div layout className={"container flex items-center justify-end text-gray-500 italic mt-2"}>
        <div className={"flex items-center gap-1 text-xs"}>
          <CalendarOutlined /> {moment(new Date(createdAt)).format('HH:mm:ss DD-MM-YYYY')}
        </div>
        <div className={" ml-4"}>{`${owner?.firstName?.substring(0,1)}.${owner?.lastName}`}</div>
      </m.div>

    </m.div>
  );
};

export default PermissionItem;