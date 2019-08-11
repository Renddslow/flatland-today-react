import styled from "styled-components";

const Button = styled.button`
  font-size: 16px;
  appearance: none;
  padding: 12px;
  background: ${props => {
    switch (props.context) {
      case "primary":
        return "#446df6";
      case "subtle":
        return "transparent";
      default:
        return "#f5f6f8";
    }
  }};
  color: ${props => (props.context !== "primary" ? "#45526c" : "#fff")};
  cursor: pointer;
  border-radius: 4px;
  border: 0;
  outline: none;
  max-width: 250px;
  display: block;
  margin: 16px 0;
  transition: all 0.2s ease-out;

  &:hover,
  &:focus {
    background: ${props => {
      switch (props.context) {
        case "primary":
          return "#3250B3";
        case "subtle":
          return "#f5f6f8";
        default:
          return "#9C9D9E";
      }
    }};
  }
`;

export default Button;
