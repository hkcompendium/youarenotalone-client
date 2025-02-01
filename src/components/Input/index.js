import { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import styles from './index.module.scss';

const Input = ({ type = 'text', placeholder, delay = false, readOnly, name, label, value, onChange }) => {
  const [ selfValue, setSelfValue ] = useState(value);
  const notifyChange = useRef(_.debounce(v => onChange(v), 1000)).current;
  const onSelfChange = (e) => {
    setSelfValue(e.target.value);
    if (delay) {
      notifyChange(e.target.value);
    } else {
      onChange(e.target.value)
    }
  };
  useEffect(() => {
    setSelfValue(value);
  }, [value]);

  return (
    <div className={styles.inputRoot}>
      {!!label && <label htmlFor={name}><span>{label}</span></label>}
      <input placeholder={placeholder} readOnly={readOnly} type={type} name={name} size="1" onChange={onSelfChange} value={selfValue} />
    </div>
  );
}
export default Input;
