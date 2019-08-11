import React, { useState } from "react";
import styled from "styled-components";
import { get } from "dot-prop";
import moment from "moment";

import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import Button from "../../components/Button";

const RibbonStyled = styled.div`
  width: 100%;
  background: ${props => (props.active ? "#00A6FB" : "#fff")};
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  padding: 12px 25px;
  text-align: left;
  box-sizing: border-box;
  margin: 8px 0;
  transition: background 0.2s ease-out, color 0.2s ease-out;
  color: ${props => (props.active ? "#fff" : "rgba(0, 0, 0, 0.75)")};
  cursor: pointer;
  outline: none;
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  grid-column-gap: 8px;
`;

const Options = styled.div`
  border-bottom: 1px solid #dfe0e2;
  padding-bottom: 1rem;
`;

const OtherContainer = styled.div`
  margin-top: 16px;
`;

const Form = styled.form`
  margin: 24px 0;
  display: grid;
  grid-row-gap: 16px;
`;

const Ribbon = props => {
  const { children, ...rest } = props;

  return (
    <RibbonStyled tabIndex={0} role="button" {...rest}>
      <span>{children}</span>
      {props.active && <i className="material-icons">check</i>}
    </RibbonStyled>
  );
};

const Respond = props => {
  const [ribbons, setRibbons] = useState({});
  const [otherText, setOtherText] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    name: ""
  });
  const options = [
    "I accepted Jesus today",
    "I recommitted my life to the Lord today",
    "I am ready to be baptized",
    ...get(props, "data.response.options", [])
  ];

  const toggleRibbonActive = option => () => {
    setRibbons({
      ...ribbons,
      [option]: !ribbons[option]
    });

    if (option === "other") {
      setOtherText("");
    }
  };

  const handleForm = e => {
    e.preventDefault();
    setSending(true);

    const numbers = Object.keys(ribbons)
      .filter(k => !isNaN(parseInt(k, 10)) && ribbons[k])
      .map(k => parseInt(k, 10));
    const selectedOptions = options.filter((_, i) => numbers.includes(i));

    if (ribbons.other && otherText) {
      selectedOptions.push(`Other: ${otherText}`);
    }

    const data = {
      name: formState.name,
      email: formState.email,
      date: moment().format("M/D/YYYY"),
      response: selectedOptions.join("; ")
    };

    fetch(
      "https://api.flatlandchurch.com/v2/forms/c9ea7813-bc4d-48ed-b9ae-f25791b255d9?key=202f1c42-7054-46ee-8ca2-ddc85f9c789b",
      {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      }
    ).then(() => {
      setSent(true);
      setSending(false);
    });
  };

  return (
    <>
      {sent ? (
        <h4>
          We're so excited to see how God is moving in your life as you move
          closer to the center of His Kingdom. We'll be in contact with you this
          week to follow up.
        </h4>
      ) : (
        <>
          <Options>
            {options.map((option, index) => (
              <Ribbon
                onClick={toggleRibbonActive(index)}
                active={ribbons[index]}
                key={`response-ribbon-${index}`}
              >
                {option}
              </Ribbon>
            ))}
            <Ribbon
              onClick={toggleRibbonActive("other")}
              active={ribbons.other}
            >
              Other
            </Ribbon>
            {ribbons.other && (
              <OtherContainer>
                <label htmlFor="other-text">Tell Us More</label>
                <Textarea
                  id="other-text"
                  textarea
                  onChange={e => setOtherText(e.target.value)}
                  value={otherText}
                />
              </OtherContainer>
            )}
          </Options>
          <Form onSubmit={handleForm}>
            <div>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                value={formState.name}
                onChange={e =>
                  setFormState({
                    ...formState,
                    name: e.target.value
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formState.email}
                onChange={e =>
                  setFormState({
                    ...formState,
                    email: e.target.value
                  })
                }
              />
            </div>
            {sending ? (
              <p>Sending...</p>
            ) : (
              <Button context="primary">Respond</Button>
            )}
          </Form>
        </>
      )}
    </>
  );
};

export default Respond;
