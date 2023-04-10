import React from 'react';

const History = ({title,key}) => {
  return (
    <div className={"container bg-green-500 flex gap-4 p-1"}>
      <h4>{title}</h4>
      <h3>{key}</h3>
    </div>
  );
};

export default History;