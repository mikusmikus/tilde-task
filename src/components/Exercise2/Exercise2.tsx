import React, { useState } from 'react';
import Button from '../Button/Button';
import PersonCard, { Person } from './Card/Card';
import './Exercise2.scss';

type Props = {
  data: Person[];
};
const Exercise2 = ({ data }: Props) => {
  const [persons, setPersons] = useState<Person[]>(data);

  const createPerson = () => {
    const newPerson: Person = {
      id: String(Math.floor(Math.random() * 100000)),
      name: `Janis${Math.floor(Math.random() * 10000)}`,
      loans: [],
      balance: 10000,
    };

    setPersons([...persons, newPerson]);
  };

  return (
    <div className="tilde-container">
      <div className="exercise2">
        <Button
          onClick={() => {
            createPerson();
          }}
        >
          Add Person
        </Button>

        <div className="cards-wrapper">
          {persons.map((person) => {
            return (
              <PersonCard
                key={person.id}
                person={person}
                allPersons={persons}
                setAllPersons={setPersons}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Exercise2;
