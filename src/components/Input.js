import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  appearance: none;
  border: 2px solid #262626;
  padding: 12px;
  box-sizing: border-box;
  letter-spacing: -0.75;
  display: block;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  resize: none;
  outline: none;
  background: #f5f6f8;
  transition: background 0.2s ease-out;
  margin-top: 4px;

  &:focus,
  &:hover {
    background: #fff;
  }

  &:focus {
    border: 3px solid #446df6;
    padding: 11px;
  }
`;

export default Input;
