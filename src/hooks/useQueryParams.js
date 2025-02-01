
import { useQueryParams, DateParam, withDefault, StringParam, BooleanParam, ArrayParam } from 'use-query-params';
import { useCallback } from 'react';
import _ from 'lodash';

const useQueryParamCustom = () => {
  const [query, setQuery] = useQueryParams({
    sidebar: BooleanParam,
    oldUI: BooleanParam,

    keyword: StringParam,
    charge: StringParam,
    magistrate: StringParam,
    from: withDefault(DateParam, new Date('2019-06-09')),
    to: withDefault(DateParam, new Date()),
    tags: ArrayParam,
    name: StringParam,
    age: StringParam,
    incident: StringParam,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addTag = useCallback((tag) => setQuery({ tags: _.uniq([...query.tags || [], tag ]) }), [query.tags]);

  return {
    query, setQuery,
    ...query,
    setOldUI: (oldUI) => setQuery({ oldUI }),
    setCharge: (charge) => setQuery({ charge }),
    setSidebar: (sidebar) => setQuery({ sidebar }),
    setKeyword: (keyword) => setQuery({ keyword }),
    setMagistrate: (magistrate) => setQuery({ magistrate }),
    setFrom: (from) => setQuery({ from }),
    setTo: (to) => setQuery({ to }),
    setTags: (tags) => setQuery({ tags }),
    setName: (name) => setQuery({ name }),
    setAge: (age) => setQuery({ age }),
    setIncident: (incident) => setQuery({ incident }),
    addTag,
  };
}

export default useQueryParamCustom;
