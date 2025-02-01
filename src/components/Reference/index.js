import classnames from 'classnames';
import styles from './index.module.scss';

const Reference = ({ data }) => {
  return (
    <div className={classnames(styles.root)}>
      <a className={styles.source} href={data} target="_blank" rel="noopener noreferrer">{data}</a>
    </div>
  )
};
export default Reference;
