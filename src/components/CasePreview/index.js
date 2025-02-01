import classnames from 'classnames';
import Avatar from 'components/Avatar';
import _ from 'lodash';
import styles from './index.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import useQueryParams from 'hooks/useQueryParams';

import { observer } from 'mobx-react';

const TYPES = ['未分類', '提訊日', '審前覆核', '聽取對控罪的回答', '提堂', '保釋申請', '答辯', '審訊', '裁決', '判刑'];
const Event = ({ data }) => {
  const history = useHistory();
  const location = useLocation();
  const active = location.pathname === "/case/" + data.id;
  const { addTag, setMagistrate, setSidebar, setIncident } = useQueryParams();

  const overlayButton = (
    <button
      onClick={() => {
        setSidebar(false);
        history.push({
          pathname: '/case/' + data.id,
          search: window.location.search,
        })
      }}
      type="button"
      className={styles.btnOverlay}
    />
  );

  return (
    <div className={classnames(styles.eventRoot, {
      [styles.bg10]: data.type === TYPES[0],
      [styles.bg20]: data.type === TYPES[1],
      [styles.bg30]: data.type === TYPES[2],
      [styles.bg40]: data.type === TYPES[3],
      [styles.bg50]: data.type === TYPES[4],
      [styles.bg60]: data.type === TYPES[5],
      [styles.bg70]: data.type === TYPES[6],
      [styles.active]: active,
      [styles.deleted]: !!data.deletedAt,
      [styles.noBg]: true,
    })}>
      <div className={styles.bgImage}>
        <div />
      </div>
      <button type="button" onClick={() => setIncident(data.incident)} className={styles.incident}>
        {data.incident}
      </button>
      {overlayButton}
      <div className={styles.left}>
        <button
          onClick={() => history.push({
            pathname: '/case/' + data.id,
            search: window.location.search,
          })}
          type="button"
          className={styles.btnOverlay}
        />
        <div className="column left top stretch fullwidth">
          {overlayButton}
          <span className="h3 row left middle flex-wrap pt-1">
            {!data.defendants.length && '未記名'}
            {data.defendants.map((d, i) => {
              const chargeVerdictCount = d.charges.filter(c => c.verdict === '成立').length;
              const chargeStatus = chargeVerdictCount === d.charges.length
                ? <small className="mr-2 red">全部成立</small>
                : <small className="mr-2 pink">部份成立</small>;
              return (
                <h3 className="mb-1" key={`defendant-${data.id}-${i}`}>
                  {d.name}
                  <span className="mr-2">{d.age}</span>
                  {!!chargeVerdictCount && chargeStatus}
                </h3>);
            })}
          </span>

          <p className={styles.description}>
            {overlayButton}
            {data.description || data.summary || (data.charges || []).join('、')}
          </p>
        </div>
        <div className={styles.tags}>
          {_.uniq([...data.tags || []]).map((tagText, i) => (
            <button type="button" key={`${i}-${tagText}`} onClick={() => addTag(tagText)}>
              <small className={styles.tag}>#{tagText}</small>
            </button>
          ))}
        </div>

      </div>
      <div className={styles.right}>
        {overlayButton}
        <small>
          <button
            className={styles.datetime}
            type="button"
            disabled
          >
            {/* {moment(data.datetime).format('YYYY-MM-DD HH:mm')} */}
          </button>
        </small>
        <h4 className="my-2">{_.get(data, 'editStatus') === 'verified' ? '經核實' : null}</h4>
        <div className={styles.avatarGroup}>
        <Avatar
          onClick={() => setMagistrate(_.get(data, 'magistrateProfile.name'))}
          name={_.get(data, 'magistrateProfile.name')}
          label="裁"
          avatar={_.get(data, 'magistrateProfile.avatar')}
        />
        </div>
      </div>
    </div>
  );
}
export default observer(Event);
