import { useEffect, useState } from 'react';

const useCases = ({ query: queryParams } = {}) => {

  const [fullList, setFullList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/data/index/list.json`)
      .then(res => res.json())
      .then(data => {
        setFullList(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    const data = fullList.filter(v => {
      if (queryParams.keyword && !v.summary.includes(queryParams.keyword)) return false;
      if (queryParams.charge) {
        const charge = v.defendants.find(d => d.charges.find(c => c.charge.includes(queryParams.charge)));
        if (!charge) return false;
      }
      if (queryParams.magistrate && !v.magistrateProfile.name.includes(queryParams.magistrate)) return false;
      if (queryParams.name || queryParams.age) {
        const defendant = v.defendants.find(d => {
          if (queryParams.name && d.name !== queryParams.name) return false;
          if (queryParams.age && d.age !== parseInt(queryParams.age)) return false;
          return true;
        });
        if (!defendant) return false;
      }
      if (queryParams.incident && !v.incident.includes(queryParams.incident)) return false;
      if (queryParams.tags) {
        if (!queryParams.tags.every(tag => v.tags.includes(tag))) return false;
      }
      return true;
    });
    setData(data);
  }, [fullList, queryParams]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return {
    data: data.slice(0, (currentPage + 1) * 20),
    loading,
    loadMore,
    hasNextPage: currentPage < Math.ceil(data.length / 20),
    totalCount: data.length,
  };

}

export default useCases;
