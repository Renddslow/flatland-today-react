import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import uuid from "uuid/v4";
import qs from 'qs';

import Tabs from "./components/Tabs";
import Logo from "./Logo";

import RouteProvider from './RouteProvider';
import DataProvider from './DataProvider';

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
  const setHistoryTab = (history) => (tabId) => {
    const search = qs.parse(window.location.search.replace('?', ''));
    const url = `${window.location.pathname}?${qs.stringify({
      ...search,
      tab: tabId
    })}`;
    history.push(url);
  };

  useEffect(() => {
    const hasId = window.localStorage.getItem("flatland:today:id");

    if (!hasId) {
      window.localStorage.setItem("flatland:today:id", uuid());
    }
  }, []);

  return (
    <RouteProvider>
      {({ week, activeTab, title, history }) => (
        <DataProvider week={week}>
          {({ data, tabs, loading, needsContent }) => (
            <Container className="App">
              <Header>
                <h1>{title}</h1>
                <Logo />
              </Header>
              {!loading && !!tabs.length && (
                <Tabs
                  activeId={activeTab}
                  onChange={setHistoryTab(history)}
                  data={data}
                  week={week}
                  history={history}
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
          )}
        </DataProvider>
      )}
    </RouteProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
