import React, { useState } from "react";
import styled from "styled-components";

import Card from "../../components/Card";
import Checkbox from "../../components/Checkbox";

import pollData from "./pollData";

const PollCard = styled(Card)`
  width: 100%;
  background: #7371fc;
  padding: 24px;
  box-sizing: border-box;
  color: #fff;

  h2 {
    border-bottom: 2px solid #fff;
    padding-bottom: 24px;
  }

  h3 {
    margin: 24px 0;
  }

  p:first-of-type {
    margin-top: 24px;
    display: block;
    font-size: 12px;
  }
`;

const Form = styled.form`
  display: grid;
  width: 100%;
  grid-row-gap: 8px;
  margin-top: 24px;
`;

const Button = styled.button`
  background: #262626;
  border-radius: 8px;
  border: 1px solid #262626;
  color: #fff;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 300;
  padding: 12px;
  display: block;

  &:hover,
  &:focus {
    background: #262626aa;
  }
`;

const Poll = props => {
  const [optionState, setOptionState] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForm = e => {
    e.preventDefault();
    setSending(true);

    const data = {
      userId: window.localStorage.getItem("flatland:today:id"),
      selections: Object.keys(optionState).join(",")
    };
    fetch("https://sheetdb.io/api/v1/4vwar2g3en491", {
      body: JSON.stringify({ data: [data] }),
      headers: {
        "content-type": "application/json",
        authorization: `Basic ${btoa("0j9mc18z:uet9au0refgnuthxwe54")}`
      },
      method: "POST"
    }).then(() => {
      setSending(false);
      setSent(true);
    });
  };

  const resetForm = () => {
    setOptionState({});
    setSent(false);
    setSending(false);
  };

  return (
    <PollCard>
      <h2>{props.title}</h2>
      {sent ? (
        <div>
          <h3>
            Thanks so much for all you do to help our mission move forward!
          </h3>
          <Button onClick={resetForm}>Reset Form</Button>
        </div>
      ) : (
        <>
          <p>(Check all that apply)</p>
          <Form onSubmit={handleForm}>
            {pollData.options.map((option, idx) => (
              <Checkbox
                key={option.id}
                label={option.label}
                id={option.id}
                value={optionState[option.id]}
                onChange={checked =>
                  setOptionState({
                    ...optionState,
                    [option.id]: checked
                  })
                }
                letter={String.fromCharCode(65 + idx)}
              />
            ))}
            {sending ? <p>Sending...</p> : <Button>Submit</Button>}
          </Form>
        </>
      )}
    </PollCard>
  );
};

export default Poll;
