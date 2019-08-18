import React from "react";
import styled from "styled-components";
import { get, has } from "dot-prop";

import Markdown from "../../components/Markdown";
import MessageNote from "./MessageNote";

const MessageWrapper = styled.div`
  blockquote {
    margin-right: 0;
    margin-left: 20px;
    position: relative;
  }
  blockquote::before {
    content: "";
    display: block;
    position: absolute;
    left: -20px;
    width: 8px;
    background: #acc35b;
    height: 100%;
  }

  img {
    max-width: 100%;
  }

  h3 {
    border-bottom: 1px solid #dfe0e2;
    padding-bottom: 1rem;
    margin-top: 3rem;
    font-size: 34px;
    letter-spacing: -0.5px;
    line-height: 34px;
  }
  
  ul {
    padding: 0 24px;
  }
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 900;
`;

const Meta = styled.div`
  margin: 18px 0;
  display: grid;
  grid-row-gap: 6px;

  a {
    color: #736ced;
    padding: 4px;
    border-radius: 8px;
    text-decoration: none;

    &:hover,
    &:focus {
      background: #e7f0ff;
    }
  }
`;

const Message = props => (
  <MessageWrapper>
    <Title>{get(props, "data.message.title", "")}</Title>
    <Meta>
      {has(props, "data.message.speaker") && (
        <p>
          <strong>Speaker: </strong>
          {props.data.message.speaker}
        </p>
      )}
      {has(props, "data.message.series") && (
        <p>
          <strong>Series: </strong>
          <a href={get(props, "data.message.series.internalUrl")}>
            {get(props, "data.message.series.title")}
          </a>
        </p>
      )}
    </Meta>
    {get(props, "data.message.content", []).map((line, idx) => (
      <React.Fragment key={`message-content-${idx}`}>
        <Markdown>{line}</Markdown>
        <MessageNote index={idx} week={props.week} />
      </React.Fragment>
    ))}
  </MessageWrapper>
);

export default Message;
