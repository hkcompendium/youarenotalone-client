import { useEffect, useState } from 'react';

const useCase = ({ id } = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`/data/case/${id}.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.error(err);
        setError('Not found');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return { data: data, loading, error };

}

export default useCase;
