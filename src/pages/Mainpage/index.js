import { Switch, Route } from 'react-router-dom';

import useQueryParams from 'hooks/useQueryParams';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import EventList from 'components/EventList';
import Case from 'components/Case';
import CaseV1 from 'components/CaseV1';
import { useRef } from 'react';
import styles from './index.module.scss';
import EventSearchForm from 'components/EventSearchForm';
import Indexpage from '../Indexpage';
function Mainpage() {
  const scrollParentRef = useRef();
  const { sidebar, setSidebar, oldUI, setOldUI } = useQueryParams();

  return (
    <div className={styles.root}>
      <div className={classnames(styles.left, { [styles.close]: !sidebar })}>
        <EventSearchForm />
        <button
          className={classnames(styles.btnOpenLeftPanel, {
            [styles.close]: !sidebar,
          })}
          onClick={() => setSidebar(!sidebar)}
        >
          <i className="fa fa-times" />
          <span className="search">
            <i className="fa fa-search mr-2" />
            案件一覽
          </span>
        </button>
        <div className={styles.searchResult} ref={scrollParentRef}>
          <EventList scrollParentRef={scrollParentRef} />
        </div>
      </div>
      <div className={styles.right}>
        <div className="row right">
          <button
            className="p4 blue"
            onClick={() => setOldUI(!oldUI)}
          >
              {oldUI ? '以新格式檢視' : '以舊格式檢視'}
          </button>
        </div>
        <Switch>
          <Route
            name="Case"
            path="/case/:eventId"
            component={oldUI ? CaseV1 : Case}
          />
          <Route name="Home" path="/" component={Indexpage} />
        </Switch>
      </div>
    </div>
  );
}

export default observer(Mainpage);
