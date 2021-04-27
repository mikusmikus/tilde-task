import React, { Fragment } from 'react';
import Exercise1 from '../components/Exercise1/Exercise1';

const data = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ducimus labore omnis expedita quibusdam molestiae nisi enim similique eius necessitatibus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ducimus labore omnis expedita quibusdam molestiae nisi enim similique eius necessitatibus?',
    extraContent: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo!',
    showExtraContent: true,
  },
  {
    id: 2,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut consectetur qui ad nesciunt accusamus ipsum fugit tenetur recusandae minima repellat.',
    extraContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque.',
    showExtraContent: true,
  },
];

const Task1 = () => {
  return (
    <>
      <Exercise1 data={data} />
    </>
  );
};

export default Task1;
