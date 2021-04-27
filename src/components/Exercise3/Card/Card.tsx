import React, { FC } from 'react';
import './Card.scss';
import Button from '../../Button/Button';

type Coordinates = {
  x: number;
  y: number;
};

type Props = {
  data: Coordinates[];
  dataIndex: number;
  onClick: () => void;
};

const Card = ({ data, dataIndex, onClick }: Props) => {
  return (
    <div className="card">
      <h3 className="title">Example {dataIndex + 1}</h3>
      <div className="coordinates">
        <div className="content">
          {data.map((item, index) => {
            return (
              <span key={`${Date() + Date() + index}`}>
                (x: {item.x}; y: {item.y} )
              </span>
            );
          })}
        </div>
      </div>
      <Button onClick={() => onClick()}>IS IT CLOCKWISE?</Button>
    </div>
  );
};

export default Card;
