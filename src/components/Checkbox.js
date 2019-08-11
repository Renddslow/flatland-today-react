import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.label`
  padding: 8px;
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #262626;
  background: ${props => (props.checked ? "#e3ebffee" : "#e3ebffaa")};
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, 1fr) minmax(
      0,
      max-content
    );
  align-items: center;
  grid-column-gap: 8px;
  color: #262626;
  cursor: pointer;
`;

const CheckboxStyled = styled.input`
  appearance: none;
  border: 2px solid #262626;
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background: ${props =>
    props.checked ? "#262626" : "rgba(255, 255, 255, 0.6)"};
  outline: none;
  cursor: pointer;

  &::after {
    content: ${props => `"${props.letter}"`};
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => (props.checked ? "#fff" : "#262626")};
    font-weight: 600;
    font-size: 12px;
    height: 100%;
  }
`;

const Check = styled.i.attrs({
  className: "material-icons",
  children: "check"
})`
  color: #262626;
`;

const Checkbox = ({ id, value, onChange, label, letter }) => (
  <CheckboxContainer htmlFor={id} checked={value}>
    <CheckboxStyled
      name={`option[${id}]`}
      type="checkbox"
      id={id}
      checked={value !== undefined ? value : false}
      onChange={() => onChange(!value)}
      letter={letter}
    />
    <span>{label}</span>
    {value && <Check />}
  </CheckboxContainer>
);

export default Checkbox;
