import classnames from 'classnames';
import styles from './index.module.scss';

const stringToColour = function (str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = ((hash >> (i * 8)) & 0xff) + 50;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

const Avatar = ({ avatar: imageUrl, name = '', label, onClick, small = false }) => {
  const placeholder = name.trim().substring(0,1) || '?';
  const bg = stringToColour(name);
  return (
    <button
      type="button"
      title={name}
      className={styles.avatarRoot}
      onClick={() => onClick && onClick(name)}
      disabled={!onClick}
    >
      <div
        className={classnames(styles.icon, { [styles.small]: small })}
        style={{
          backgroundColor: name && bg,
          backgroundImage: imageUrl ? `url("${imageUrl}")` : 'none',
        }}
      >
        {!imageUrl && <span>{placeholder}</span>}
      </div>
      {label &&
        <div className={styles.label}>
          <small>{label}</small>
        </div>}
    </button>
  )
};
export default Avatar;
