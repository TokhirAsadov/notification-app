import React, {useState} from 'react';
import { CommentOutlined,MoreOutlined,DeleteOutlined,CalendarOutlined,ArrowRightOutlined,SendOutlined } from '@ant-design/icons';
import moment from "moment";
import {Input} from "antd";
import axios from "axios";
import {BASE_URL, getHeaders} from "../../utills/ServiceUrls";
import {useSelector} from "react-redux";

const PermissionItem = ({permissionPostId,content,status,description,createdAt,updatedAt,createdBy,updatedBy,fromDate,toDate,commits}) => {

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

  return (
    <div key={permissionPostId} className={"container bg-white border p-4 rounded-lg transition"}>
      <div className={"container flex justify-between"}>
        <div className={"container flex items-center justify-between"}>
          <div>{content}</div>
          <div className={"w-8 h-8 flex items-center justify-center hover:bg-gray-200 mr-8 cursor-pointer rounded-full transition"} onClick={()=> setOpenAllData(prevState => !prevState)}><MoreOutlined/></div>
        </div>
        <button className={`rounded p-2 text-gray-600 ${status ==='AT_PROCESS' ? 'bg-yellow-300' : status ==='SUCCESS' ? 'bg-green-500': 'bg-red-500'} ${role ? 'cursor-not-allowed':"cursor-pointer"}`}>{status}</button>
      </div>
      {/*todo------------------ tuliq barcha ma`lumotlarni chiqarish kk --------------------*/}
      {
        openAllData && <div className={"container flex flex-col gap-1 mt-4 rounded bg-gray-100 p-4 transition"}>
            <div className={"container flex justify-between text-xs"}>
              <div className={"flex align-middle justify-center gap-1"}><CalendarOutlined style={{ width:'16px',height:'16px', display:'flex', alignItems:'center',justifyContent:'center' }} /> {moment(new Date(fromDate)).format('HH:mm:ss DD-MM-YYYY')}</div>
              <ArrowRightOutlined style={{ width:'16px',height:'16px', display:'flex', alignItems:'center',justifyContent:'center' }} />
              <div className={"flex align-middle justify-center gap-1"}><CalendarOutlined style={{ width:'16px',height:'16px', display:'flex', alignItems:'center',justifyContent:'center' }} /> {moment(new Date(toDate)).format('HH:mm:ss DD-MM-YYYY')}</div>
            </div>
            <hr className={"w-full bg-white border-0 mt-1 "} style={{ height: '1px' }}/>

            <div className={"text-justify"}>{description}</div>
        </div>
      }
      {!openAllData && <hr className={"w-32"}/>}

      <div className={"container flex items-center mt-4 "}>
        <div className={"w-8 h-8 flex items-center justify-center p-2 text-lg rounded-full hover:bg-gray-200 cursor-pointer transition"} onClick={() => setOpenCommits(prevState => !prevState)}>
          <CommentOutlined />
        </div>
        <div className={"w-4 h-4 flex items-center justify-center text-xs ml-1"}>{commits?.length > 0 ? commits?.length : 0}</div>
      </div>

      {
        openCommits && <div className={"container flex flex-col gap-1 rounded bg-gray-100 p-4 transition"}>
          <div className={"container flex gap-2"}>
            <div className={"flex items-center justify-center text-xs"}>Commit:</div>
            <Input name={"commit"} value={commitObj?.commit} placeholder="Commit..." onChange={(e) => setCommitObj(prevState => ({...prevState,commit: e.target.value}))}/>
            <button onClick={() => submitCommit(commitObj)} className={"p-2 flex items-center justify-center rounded text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition text-xs"}><SendOutlined /></button>
          </div>
          {openCommits  && commits?.length > 0  && <hr className={"w-full bg-white border-0 mt-1"} style={{ height: '1px' }}/>}
          {
            commits?.map((commit,index) => <div key={index} className={"container flex italic items-center justify-between"}>
              <div>
                {user?.id===commit?.createdBy ? "you: " : role ? "admin: " : "user: "}{commit?.content}
              </div>
              <button onClick={()=>deleteCommit(permissionPostId,commit?.id)} className={"w-8 h-8 flex items-center justify-center p-1 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition "}><DeleteOutlined /></button>
            </div>)
          }
        </div>
      }

      <div className={"container flex items-center justify-end text-gray-500 italic mt-2"}>
        <div className={"flex items-center gap-1 text-xs"}>
          <CalendarOutlined /> {moment(new Date(createdAt)).format('HH:mm:ss DD-MM-YYYY')}
        </div>
        <div className={" ml-4"}>username</div>
      </div>

    </div>
  );
};

export default PermissionItem;