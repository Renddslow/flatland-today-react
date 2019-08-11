import React, { useEffect, useState } from 'react';
import getTabs from './getTabs';

const DataProvider = ({ children, week }) => {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [data, setData] = useState({});
  const [needsContent, setNeedsContent] = useState(false);

  useEffect(() => {
    const cachedWeek = window.localStorage.getItem(
      `flatland:today:cache:${week}`
    );

    const complete = (week, data) => {
      setLoading(false);
      setTabs(getTabs(week, data));
      setData(data);
    };

    if (cachedWeek) {
      const data = JSON.parse(cachedWeek || "{}");
      complete(week, data);
    } else {
      if (week) {
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
    }
  }, [week]);

  return children({ data, tabs, loading, needsContent });
};

export default DataProvider;
