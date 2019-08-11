import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import uuid from "uuid/v4";
import moment from "moment";
import qs from "qs";

import Tabs from "./components/Tabs";
import Logo from "./Logo";

import getTabs from "./getTabs";

import "./styles.css";

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const Header = styled.header`
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
  width: 100%;
  box-sizing: border-box;
  align-items: center;

  h1 {
    font-weight: 900;
  }
`;

const ErrorMessage = styled.div`
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 24px;

  h2 {
    font-size: 37px;
    font-weight: 900;
    line-height: 0.9;
    margin-bottom: 24px;
  }

  p {
    font-size: 21px;
    line-height: 1.5;
    font-weight: 300;
    letter-spacing: 0.9;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  em {
    font-style: normal;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 60%;
      background: #00f2f2;
      left: 0;
      bottom: -4px;
      z-index: -1;
    }
  }
`;

function App() {
  const { tab } = qs.parse(window.location.search.replace("?", ""));

  const [activeTab, setActiveTab] = useState(tab);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Today");
  const [tabs, setTabs] = useState([]);
  const [needsContent, setNeedsContent] = useState(false);
  const [data, setData] = useState({});
  const [thisWeek, setThisWeek] = useState();

  useEffect(() => {
    const hasId = window.localStorage.getItem("flatland:today:id");
    const urlMatch = /\/weeks\/([\d]{4}-[\d]{2})/g;
    const currentWeek = moment().format("Y-w");

    if (!hasId) {
      window.localStorage.setItem("flatland:today:id", uuid());
    }

    const url = urlMatch.exec(window.location.pathname || "");

    if (!url) {
      window.history.replaceState({}, "", `/weeks/${currentWeek}`);
    }

    const [_, week] = url;

    if (week !== currentWeek || moment().format("dddd") !== "Sunday") {
      const date = moment(week, "Y-w").format("MMMM Do");
      setTitle(`Week of ${date}`);
    }

    const cachedWeek = window.localStorage.getItem(
      `flatland:today:cache:${week}`
    );

    const complete = (week, data) => {
      setLoading(false);
      setTabs(getTabs(week, data));
      setData(data);
    };

    setThisWeek(week);

    if (cachedWeek) {
      const data = JSON.parse(cachedWeek || "{}");
      complete(week, data);
    } else {
      fetch(
        `https://api.flatlandchurch.com/v2/weeks/${week}?key=pk_e6afff4e5ad186e9ce389cc21c225`
      )
        .then(data => data.json())
        .then(data => {
          complete(week, data);

          if (data.lockCache) {
            window.localStorage.setItem(
              `flatland:today:cache:${week}`,
              JSON.stringify(data)
            );
          }
        })
        .catch(() => {
          setNeedsContent(true);
        });
    }
  }, []);

  return (
    <Container className="App">
      <Header>
        <h1>{title}</h1>
        <Logo />
      </Header>
      {!loading && !!tabs.length && (
        <Tabs
          activeId={activeTab}
          onChange={id => setActiveTab(id)}
          data={data}
          week={thisWeek}
        >
          {tabs}
        </Tabs>
      )}
      {needsContent && (
        <ErrorMessage>
          <h2>Alright, so one of two things happened.</h2>
          <p>
            Either, you're a <em>time traveler</em> and you're trying to figure
            out what God has to say to you in the future, or{" "}
            <em>we're running a little behind</em> and are still working on
            typing everything up for the week.
          </p>
          <p>
            I'm sure if you try again in a few minutes or so everything will be
            right as rain.
          </p>
        </ErrorMessage>
      )}
    </Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
