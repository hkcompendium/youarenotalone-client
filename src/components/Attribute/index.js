import classnames from 'classnames';
import styles from './index.module.scss';
import _ from 'lodash';

const Attribute = ({
  caseId, placeholder,
  noLabel, label, value, children, name,
  noPadding, isTextarea, noMargin = false,
}) => {

  if (_.isEmpty(value)) return null;

  return (
    <div className={classnames(styles.root, { [styles.noPadding]: noPadding, [styles.noLabel]: noLabel, [styles.noMargin]: noMargin })}>
      <div className="row middle left">
        {!noLabel && <span className={styles.label}>{label}</span>}
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  )
};
export default Attribute;
