import React from 'react';
import PermissionItem from "./PermissionItem";

const Permissions = ({posts}) => {
  return (
    <div className={"flex bg-gray-200 flex-col gap-4 mt-4 p-4"}>
      {
        posts?.map(
          (post,index) => <PermissionItem
            key={index}
            permissionPostId={post?.id}
            content={post?.content}
            status={post?.status}
            description={post?.description}
            commits={post?.commits}
            fromDate={post?.fromDate}
            toDate={post?.toDate}
            createdAt={post?.createdAt}
            updatedAt={post?.updatedAt}
            createdBy={post?.createdBy}
            updatedBy={post?.updatedBy}
          />
        )
      }
    </div>
  );
};

export default Permissions;