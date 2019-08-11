import React from "react";
import styled from "styled-components";
import { get } from "dot-prop";

import Card from "../../components/Card";
import Markdown from "../../components/Markdown";

const ChallengeCard = styled(Card)`
  padding: 24px;
`;

const Challenge = props => (
  <ChallengeCard>
    <Markdown>{get(props, "data.challenge.content", "")}</Markdown>
  </ChallengeCard>
);

export default Challenge;
