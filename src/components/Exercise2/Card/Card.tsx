/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Button from '../../Button/Button';
import './Card.scss';

export interface Loan {
  id: string;
  reciever: string;
  lender: string;
  recieverId: string;
  lenderId: string;
  sum: number;
}

export interface Person {
  id: string;
  name: string;
  loans: Loan[];
  balance: number;
}

type Props = {
  person: Person;
  allPersons: Person[];
  setAllPersons: React.Dispatch<React.SetStateAction<Person[]>>;
};

const PersonCard = ({ person, allPersons, setAllPersons }: Props) => {
  const [sum, setSum] = useState('');
  const [selectedPersonsId, setSelectedPersonsId] = useState('');
  const [sumPopup, setSumPopup] = useState('');
  const [namePopup, setNamePopup] = useState('');

  // handle input errors (wrong id, money/balance)
  const IsInputError = (money: number, balance: number) => {
    const personsId = allPersons.find((p) => p.id === selectedPersonsId);
    if (!selectedPersonsId) {
      setNamePopup('enter Id');
      return true;
    }

    if (!personsId || selectedPersonsId === person.id) {
      setNamePopup('wrong Id');
      return true;
    }

    if (!money) {
      setSumPopup('enter Money');
      setNamePopup('');
      return true;
    }
    if (balance < money) {
      setSumPopup('Not enough money');
      setNamePopup('');
      return true;
    }
    return false;
  };

  // handle money send to other person, change balance for both people, add loans
  const handleMoneySend = (money: string) => {
    const moneyNumber = parseInt(money, 10);
    const lenderBalance = person.balance;

    if (IsInputError(moneyNumber, lenderBalance)) {
      return;
    }

    const lenderIndex = allPersons.findIndex((p) => p.id === person.id);
    const recieverIndex = allPersons.findIndex((p) => p.id === selectedPersonsId);

    const newLoan: Loan = {
      id: String(Math.floor(Math.random() * 10000000)),
      reciever: allPersons[recieverIndex].name,
      lender: person.name,
      lenderId: person.id,
      recieverId: selectedPersonsId,
      sum: parseInt(money, 10),
    };
    const copyPersons = [...allPersons];

    copyPersons[lenderIndex].balance -= moneyNumber;
    copyPersons[lenderIndex].loans.push(newLoan);

    copyPersons[recieverIndex].balance += moneyNumber;
    copyPersons[recieverIndex].loans.push(newLoan);

    setSelectedPersonsId('');
    setSum('');
    setAllPersons(copyPersons);
  };

  // handle money recieve to other person, change balance for both people, add loans
  const handleMoneyRecieve = (money: string) => {
    const personsId = allPersons.find((p) => p.id === selectedPersonsId);
    if (!personsId){
      setNamePopup('enter Id');
      return;
    }


    const moneyNumber = parseInt(money, 10);

    const copyPersons = [...allPersons];
    const lenderIndex = allPersons.findIndex((p) => p.id === selectedPersonsId);
    const lenderBalance = allPersons[lenderIndex].balance;

    if (IsInputError(moneyNumber, lenderBalance)) {
      return;
    }

    const recieverIndex = allPersons.findIndex((p) => p.id === person.id);

    const newLoan: Loan = {
      id: String(Math.floor(Math.random() * 10000000)),
      lender: allPersons[lenderIndex].name,
      reciever: person.name,
      lenderId: selectedPersonsId,
      recieverId: person.id,
      sum: parseInt(money, 10),
    };

    copyPersons[lenderIndex].balance -= moneyNumber;
    copyPersons[lenderIndex].loans.push(newLoan);

    copyPersons[recieverIndex].balance += moneyNumber;
    copyPersons[recieverIndex].loans.push(newLoan);

    setSelectedPersonsId('');
    setSum('');
    setAllPersons(copyPersons);
  };

  // handle loans paybacks. change persons balances, delete loan from persons loans array.
  const handleLoanPayback = (paybackPerson: Person, loan: Loan) => {
    const copyPersons = [...allPersons];

    const lenderIndex = allPersons.findIndex((p) => p.id === paybackPerson.id);
    const recieverIndex = allPersons.findIndex((p) => p.id === loan.lenderId);

    copyPersons[lenderIndex].balance -= loan.sum;
    copyPersons[recieverIndex].balance += loan.sum;

    const lenderLoanIndex = copyPersons[lenderIndex].loans.findIndex((l) => l.id === loan.id);
    const recieverLoanIndex = copyPersons[recieverIndex].loans.findIndex((l) => l.id === loan.id);

    copyPersons[lenderIndex].loans.splice(lenderLoanIndex, 1);
    copyPersons[recieverIndex].loans.splice(recieverLoanIndex, 1);

    setAllPersons(copyPersons);
  };

  // handle loans bg color. green if lender, red if reciever
  const handleBackgroundColor = (lender: string) => {
    if (lender === person.name) {
      return { backgroundColor: 'lightgreen' };
    }
    return { backgroundColor: '#ff9f9f' };
  };

  return (
    <div className="card">
      <h3 className="title">
        Name: {person.name} [id: {person.id}]
      </h3>
      <p>Balance: {person.balance}</p>

      <label htmlFor={person.name} className="name">
        {namePopup && <div className="popup">{namePopup}</div>}
        Name
        <input
          type="text"
          value={selectedPersonsId}
          id={person.name}
          onFocus={(e) => e.target.select()}
          placeholder="Enter persons id..."
          onChange={(e) => {
            setSumPopup('');
            setSelectedPersonsId(e.target.value);
          }}
        />
      </label>

      <label htmlFor={person.id} className="sum">
        {sumPopup && <div className="popup">{sumPopup}</div>}
        Sum
        <input
          type="number"
          value={sum}
          id={person.id}
          onFocus={(e) => e.target.select()}
          placeholder="Money..."
          onChange={(e) => {
            setSumPopup('');
            if (parseInt(e.target.value, 10) < 0 || isNaN(parseInt(e.target.value, 10))) {
              setSum('');
              return;
            }
            setSum(e.target.value);
          }}
        />
      </label>
      <Button onClick={() => handleMoneySend(sum)}>Send</Button>
      <Button onClick={() => handleMoneyRecieve(sum)}>Recieve</Button>
      {person.loans.length ? (
        <div className="loans">
          <h4>Loans</h4>
          <ul>
            {person.loans.map((loan) => {
              return (
                <li key={loan.id} style={handleBackgroundColor(loan.lender)}>
                  <div className="persons">
                    <span>Lender: {loan.lender}</span>
                    <span>Reciever: {loan.reciever}</span>
                  </div>
                  <div className="sum">
                    <span>Sum: {loan.sum}</span>
                    {person.name === loan.reciever && (
                      <Button onClick={() => handleLoanPayback(person, loan)}>Pay back</Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default PersonCard;
