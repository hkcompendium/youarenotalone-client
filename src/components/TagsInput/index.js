import styles from './index.module.scss';

const Tag = ({ text, onRemove }) => (
  <div className={styles.tag}>
    <span>{text}</span>
    <button type="button" onClick={() => onRemove(text)}>
      <i className="fa fa-times" />
    </button>
  </div>
)
const TagsInput = ({ value = [], onChange }) => {
  const onRemove = (text) => {
    onChange(value.filter(v => v !== text));
  }
  return (
    <div className={styles.root}>
      {value.map((text, i) => (
        <Tag key={`tag-${i}-${text}`} text={text} onRemove={onRemove} />
      ))}
    </div>
  );
};
export default TagsInput;
