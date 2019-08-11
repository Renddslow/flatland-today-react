import React from "react";
import styled from "styled-components";
import { get } from "dot-prop";

import Card from "../../components/Card";
import Markdown from "../../components/Markdown";

const AnnouncementCard = styled(Card)`
  padding: 24px;
  box-sizing: border-box;
  position: relative;
  color: #000;
  overflow: hidden;

  h2 {
    font-size: 21px;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;

const Grid = styled.div`
  display: grid;
  grid-row-gap: 18px;
`;

const LinkIconContainer = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
  top: 0;
  display: grid;
  align-items: center;
  justify-content: center;
  margin: 8px;
`;

const LinkIcon = styled.i.attrs({
  className: "material-icons",
  children: "link"
})`
  color: #000;
  font-size: 24px;
`;

const Announcements = props => {
  return (
    <Grid>
      {get(props, "data.announcements", []).map((item, idx) => (
        <React.Fragment key={`announcements-${idx}`}>
          {item.internalUrl ? (
            <Link href={item.internalUrl}>
              <AnnouncementCard>
                <LinkIconContainer>
                  <LinkIcon />
                </LinkIconContainer>
                <h2>{item.title}</h2>
                <Markdown>{item.description}</Markdown>
              </AnnouncementCard>
            </Link>
          ) : (
            <AnnouncementCard>
              <h2>{item.title}</h2>
              <Markdown>{item.description}</Markdown>
            </AnnouncementCard>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default Announcements;
