import { useState, useEffect } from 'react';
import moment from 'moment';
import qs from 'qs';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const RouteProvider = ({ children }) => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [search, setSearch] = useState(qs.parse(window.location.search.replace('?', '')));
  const [week, setWeek] = useState();

  const currentWeek = moment().format("Y-w");

  useEffect(() => {
    if (pathname === '/') {
      const route = `/weeks/${currentWeek}`;
      history.replace(route);
      setPathname(route);
      setWeek(currentWeek);
    } else if (pathname === '/weeks') {

    } else {
      const urlMatch = /\/weeks\/([\d]{4}-[\d]{2})/g;
      const url = urlMatch.exec(pathname);

      if (!url) return history.replace('/');

      setWeek(url[1]);
    }
  }, [pathname, search, currentWeek]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setPathname(location.pathname);
      setSearch(qs.parse(location.search.replace('?', '')));
    });

    return () => {
      unlisten();
    };
  }, []);

  const title = week && week !== currentWeek ? `Week of ${moment(week, "Y-w").format("MMMM Do")}` : 'Today';

  return children({ week, title, activeTab: search.tab, history });
};

export default RouteProvider;
