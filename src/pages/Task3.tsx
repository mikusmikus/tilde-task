import React from 'react';
import Exercise3 from '../components/Exercise3/Exercise3';

const data = [
  [
    {
      x: 5,
      y: 10,
    },
    {
      x: 15,
      y: 20,
    },
    {
      x: 20,
      y: 7,
    },
  ],
  [
    {
      x: 5,
      y: 10,
    },
    {
      x: 20,
      y: 7,
    },
    {
      x: 15,
      y: 20,
    },
  ],
  [
    {
      x: 4,
      y: 3,
    },
    {
      x: 3,
      y: 3,
    },
    {
      x: 3,
      y: 5,
    },
    {
      x: 6,
      y: 5,
    },
    {
      x: 6,
      y: 3,
    },
    {
      x: 5,
      y: 3,
    },
    {
      x: 5,
      y: 2,
    },
    {
      x: 7,
      y: 2,
    },
    {
      x: 2,
      y: 6,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 4,
      y: 2,
    },
  ],
];

const Task3 = () => {
  return (
    <>
      <Exercise3 data={data} />
    </>
  );
};

export default Task3;
