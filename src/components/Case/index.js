import useCase from 'hooks/useCase';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { observer } from 'mobx-react';
import styles from './index.module.scss';

function toChinese(num) {
  const chi = '十一二三四五六七八九十';
  if (num <= 10) {
    return chi[num];
  }
  if (num <=19) {
    return '十' + toChinese(num % 10);
  }
  return toChinese(num / 10) + '十' + toChinese(num % 10);
}
const Field = ({ label, children }) => (
  <div className="row my-2">
    <div style={{ width: '100px'}}>{label}:</div>
    <div className="flex">{children}</div>
  </div>
)

const Para = ({ label, children }) => (
  <div className="my-4">
    <div style={{ fontWeight: 'bold' }}>{label}</div>
    <div className="py-2"><pre>{children}</pre></div>
  </div>
)
const Case = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useCase({ id: eventId });

  if (error) return <div>{error.message}</div>;

  if (!data) return null;

  if (loading) return <div className={styles.caseRoot}><div className="row center py-4"><small className="fas fa-spinner fa-pulse" /></div></div>;
  return (
    <div className={styles.caseRoot}>
      <div className={styles.head}>
        <div className="my-2">香港裁判法院示威案件判例匯編</div>
        <hr />
        <div className="my-2">{ data.incident}</div>
        <hr className="width-200"/>
        <div className="my-2">香港特別行政區</div>
        <div className="my-2">訴</div>
        {(data.defendants || []).map((d, di) => (
          <div className="row my-2" key={`defendant-${data.id}-${di}`}>
            <div className="flex" />
            <div className="flex">{d.name} {d.age? `(${d.age})` : ''}</div>
            <div className="flex">第{toChinese(di + 1)}被告</div>
          </div>
        ))}
        <hr className="width-200"/>
      </div>
      <div className="my-4">
        <Field label="主審法官">{data.magistrate}</Field>
        <Field label="答辯日期">{data.trialDateFrom !== data.trialDateTo ? `${data.trialDateFrom} - ${data.trialDateTo}` : data.trialDateFrom}</Field>
        <Field label="裁決日期">{data.verdictDate}</Field>
        <Field label="判刑日期">{data.sentenceDate}</Field>
        <Field label="出席人士">
          {data.prosecutionRep ? <div>{data.prosecutionRep}，為[外聘檢控官]，代表香港特別行政區</div> : null }
          {data.defendantRep ? <div>{data.defendantRep}，代表被告</div> : null }
        </Field>
        <Field label="控罪">
          {(data.defendants || []).map((d, di) => (
            <div key={`defendant-charge-${data.id}-${di}`}>
              {((d && d.charges) || []).map(charge => (
                <div key={charge.id} className="mb-2">
                  [{di + 1}] {charge.charge}
                </div>
              ))}
            </div>))}
        </Field>
      </div>
      <div>
        <Para label="事件背景">{data.description}</Para>
        <Para label="控罪詳情">
          {(data.charges || []).map((charge, i) => (
            <pre key={`charge-details-${data.id}-${i}`} className={styles.charge}>
                {charge}
              </pre>
            ))}
        </Para>
        <Para label="案件程序詳情">{data.summary}</Para>

        <Para label="裁決">{data.verdict}</Para>
        <Para label="裁決理由">{data.verdictReason}</Para>
        <Para label="判刑">{data.sentence}</Para>
        <Para label="判刑理由">{data.sentenceReason}</Para>

        <Para label="總結"></Para>
        <Para label="參考資料">
          {_.get(data, 'references.nodes', []).map((reference, i) => (
              reference.url.includes('t.me/')
            ? <div key={`reference-${data.id}-${i}`}><a href={reference.url} target="_blank" rel="noopener noreferrer">法庭文字直播台</a></div>
            : <div key={`reference-${data.id}-${i}`}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.url}</a></div>
            ))}
        </Para>
      </div>
    </div>
  );
};
export default observer(Case);
