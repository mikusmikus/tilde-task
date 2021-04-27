import React from 'react';
import Exercise2 from '../components/Exercise2/Exercise2';

const data = [
  {
    id: '111',
    name: 'Toms',
    loans: [],
    balance: 10000,
  },
  {
    id: '222',
    name: 'Jānis',
    loans: [],
    balance: 10000,
  },
  {
    id: '333',
    name: 'Pēteris',
    loans: [],
    balance: 10000,
  },
  {
    id: '444',
    name: 'Andris',
    loans: [],
    balance: 10000,
  },
];

const Task2 = () => {
  return (
    <>
      <Exercise2 data={data} />
    </>
  );
};

export default Task2;
