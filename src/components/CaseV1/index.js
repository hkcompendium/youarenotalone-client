import moment from 'moment';
import Attribute from 'components/Attribute';
import Avatar from 'components/Avatar';
import Reference from 'components/Reference';
import TelegramEmbed from 'react-telegram-embed';
import useCase from 'hooks/useCase';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { observer } from 'mobx-react';
import useQueryParams from 'hooks/useQueryParams';

import styles from './index.module.scss';

const CaseV1 = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useCase({ id: eventId });
  const { addTag, setSidebar } = useQueryParams();

  if (error) return <div>{error.message}</div>;

  if (!data) return null;

  if (loading) return <div className={styles.caseRoot}><div className="row center py-4"><small className="fas fa-spinner fa-pulse" /></div></div>;
  return (
    <div className={styles.caseRoot}>
      <section className={styles.secondHeader}>
        <div className={styles.right}>
          <Attribute label="最新階段" value={data.status} noPadding noLabel>
            <div className={styles.status}>
              <span className="small">
                最新階段
              </span>
              <span className="h3">{data.status}</span>
            </div>
          </Attribute>
          <div className={styles.keyDate}>
            <Attribute label="下次關鍵日期" value={data.nextKeyDate} noPadding noLabel>
                <small>下次關鍵日期</small>
                <small>
                  {data.nextKeyDate ? moment(data.nextKeyDate).format('YYYY-MM-DD') : '-'}
                </small>
            </Attribute>
          </div>
        </div>
      </section>
      <section className={styles.header}>
        <div className={styles.left}>
          <div className={styles.tags}>
            {(data.tags || []).map((tagText, i) => (
              <button type="button" key={`${i}-${tagText}`} onClick={() => { addTag(tagText); setSidebar(true); }}>
                <small key={`${i}-${tagText}`} className={styles.tag}>#{tagText}</small>
              </button>
            ))}
          </div>
          <div className={styles.title}>
            <span className="h3 row left top flex-wrap">
              {!data.defendants?.length && '未記名'}
              {(data.defendants || []).map((d, i) => (
                <div key={`defendant-${data.id}-${i}`} className="my-2">
                  <h3 key={`defendant-${data.id}-${i}`} className="my-2">
                    {d.fullname || d.name}
                    <span className="mr-2">{d.age}</span>
                  </h3>
                  <div className="p pl-4">
                    {((d && d.charges) || []).map(charge => (
                      <div key={`charge-${data.id}-${i}-${charge.id}`} className="row left top py-1">
                        <span className={styles.chargeVerdict}>
                          <b
                            className={charge.verdict === '成立' && 'red'}
                          >
                            <i className="fas fa-gavel mr-2"></i>
                            {charge.verdict}
                          </b>
                        </span>
                        <span className={styles.chargeVerdict}>
                          {charge.plea}
                        </span>
                        <span>{charge.charge}</span>

                      </div>
                    ))}
                  </div>
                </div>))}
            </span>
            <Attribute label="簡介" value={data.description} isTextarea noPadding noLabel>
              <p className={`${styles.description} pre`}>
                {data.description}
              </p>
            </Attribute>

          </div>
        </div>
      </section>

      <section>

        <div className="row top left">
          <div className="flex">
            <Attribute label="裁判官" value={data.magistrate} noPadding>
              <div className={styles.avatarWrapper}>
                <Avatar
                  {..._.get(data, 'magistrateProfile')}
                />
                <span>{data.magistrate}</span>
              </div>
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="控方法律代表" value={data.prosecutionRep} noPadding>
              <div className={styles.avatarWrapper}>
                <Avatar
                  {..._.get(data, 'prosecutionRepProfile')}
                />
                <span>{data.prosecutionRep}</span>
              </div>
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="辯方法律代表" value={data.defendantRep} noPadding>
              <div className={styles.avatarWrapper}>
                <Avatar
                  {..._.get(data, 'defendantRepProfile')}
                />
                <span>{data.defendantRep}</span>
              </div>
            </Attribute>
          </div>
        </div>

        <div className="row top left">
          <div className="flex">
            <Attribute label="審訊日期" value={data.trialDateFrom}>
              {data.trialDateFrom !== data.trialDateTo ? `${data.trialDateFrom} - ${data.trialDateTo}` : data.trialDateFrom}
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="裁決日期" value={data.verdictDate}>
              {data.verdictDate}
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="判刑日期" value={data.sentenceDate}>
              {data.sentenceDate}
            </Attribute>
          </div>
        </div>

        <Attribute value={(data.charges || []).join('\n')} label="控罪">
          {(data.charges || []).map((charge, i) => (
            <span key={`charge-${data.id}-${i}`} className={styles.charge}>
              {charge}
            </span>
          ))}
        </Attribute>
        <Attribute label="案情撮要" value={data.summary}>
          <p className="pre">{data.summary}</p>
        </Attribute>
        <Attribute label="裁決" value={data.verdict}>
          <p className="pre">{data.verdict}</p>
        </Attribute>
        <Attribute label="裁決理由" value={data.verdictReason}>
          <p className="pre">{data.verdictReason}</p>
        </Attribute>
        <Attribute label="判刑" value={data.sentence}>
          <p className="pre">{data.sentence}</p>
        </Attribute>
        <Attribute label="判刑理由" value={data.sentenceReason}>
          <p className="pre">{data.sentenceReason}</p>
        </Attribute>

        <div className="row top">
          <div className="flex">
            <Attribute label="保釋" value={data.bailment}>
              <p className="pre">{data.bailment}</p>
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="特別保釋條件" value={data.bailmentCondition}>
              <p className="pre">{data.bailmentCondition}</p>
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="裁決前關押日數" value={data.custodyLength}>
              <p className="pre">{data.custodyLength}</p>
            </Attribute>
          </div>
        </div>
        <div className="row top">
          <div className="flex">
            <Attribute label="控辯對裁決或判刑提出上訴" value={data.appeal}>
              <p className="pre">{data.appeal}</p>
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="上訴裁決書" value={data.appealJudgementUrl}>
              <p className="pre">{data.appealJudgementUrl}</p>
            </Attribute>
          </div>
          <div className="flex">
            <Attribute label="保釋侯訴" value={data.bailmentAppeal}>
              <p className="pre">{data.bailmentAppeal}</p>
            </Attribute>
          </div>
        </div>
        <Attribute label="投訴裁判官行為及回應" value={data.complaints}>
          <p className="pre">{data.complaints}</p>
        </Attribute>
        <Attribute label="公眾觀感" value={data.publicPerception}>
          <p className="pre">{data.publicPerception}</p>
        </Attribute>
        <Attribute label="備註" value={data.remarks}>
          <p className="pre">{data.remarks}</p>
        </Attribute>
        {!!_.get(data, 'references.nodes', []).length &&
          <Attribute label="資料來源" value="1" noPadding>
            {_.get(data, 'references.nodes').map((reference, i) => (
              reference.url.includes('t.me/')
                ? <div className="py-1" key={`reference-${data.id}-${i}`}><TelegramEmbed src={reference.url} /></div>
                : <Reference key={`reference-${data.id}-${i}`} data={reference} />
            ))}
          </Attribute>}

      </section>

    </div>
  );
};
export default observer(CaseV1);
