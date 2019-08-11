import React from "react";

import Poll from "./tabs/Poll";
import Message from "./tabs/Message";
import Respond from "./tabs/Respond";
import Announcements from "./tabs/Announcements";
import Challenge from "./tabs/Challenge";

export default (week, data) => {
  const tabs = [];

  if (week === "2019-33") {
    tabs.push({
      title: "Poll",
      id: "poll",
      body: (
        <Poll title="How have you influenced your neighborhood this summer?" />
      )
    });
  }

  tabs.push(
    ...[
      {
        title: "Message",
        id: "message",
        body: <Message />
      },
      {
        title: "Respond",
        id: "respond",
        body: <Respond />
      }
    ]
  );

  if (data.announcements && data.announcements.length) {
    tabs.push({
      title: "Announcements",
      id: "announcements",
      body: <Announcements />
    });
  }

  tabs.push({
    title: "Challenge",
    id: "challenge",
    body: <Challenge />
  });

  return tabs;
};
