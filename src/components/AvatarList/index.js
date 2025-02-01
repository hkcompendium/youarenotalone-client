import classnames from 'classnames';
import styles from './index.module.scss';

const Avatar = ({ imageUrl, name = '', label, onClick, small = false }) => {
  const placeholder = name.substring(0,1);

  return (
    <div className={classnames('row middle left px-3', styles.root)}>
      {[null, null, null, null, null].map(() => (
        <button
          type="button"
          title={name}
          className={styles.avatarRoot}
          onClick={onClick}
          disabled={!onClick}
        >
          <div
            className={classnames(styles.icon, { [styles.small]: small })}
            style={{
              backgroundImage: imageUrl ? `url("${imageUrl}")` : 'none',
            }}
          >
            {!imageUrl && <span>{placeholder}</span>}
          </div>
        </button>
      ))}
    </div>

  )
};
export default Avatar;
