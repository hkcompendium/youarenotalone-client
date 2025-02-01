
import useQueryParams from 'hooks/useQueryParams';
import Input from 'components/Input';
import TagsInput from 'components/TagsInput';
import styles from './index.module.scss';

function EventSearchForm() {
  const {
    keyword, setKeyword,
    charge, setCharge,
    name, setName,
    age, setAge,
    magistrate, setMagistrate,
    tags, setTags,
    incident, setIncident,
  } = useQueryParams();

  return (
    <div className={styles.searchForm}>
      <div className="row center middle">
        <div className="flex-4"><Input label="案情關鍵字" placeholder="e.g. 攻擊性武器、理大" delay value={keyword} onChange={setKeyword} /></div>

        <div className="flex-1">
          <Input placeholder="姓" delay value={name} onChange={setName} />
        </div>
        <div className="flex-1">
          <Input placeholder="年齡" delay value={age} onChange={setAge} />
        </div>
        <div className="flex-1">
          <Input placeholder="事件" delay value={incident} onChange={setIncident} />
        </div>
      </div>
      <div><Input label="控罪" placeholder="e.g. 刑事損壞" delay value={charge} onChange={setCharge} /></div>
      <div><Input label="裁判官" delay value={magistrate} onChange={setMagistrate} /></div>
      <div>
        <TagsInput
          value={tags}
          onChange={setTags}
        />
      </div>
    </div>
  );
}

export default EventSearchForm;
