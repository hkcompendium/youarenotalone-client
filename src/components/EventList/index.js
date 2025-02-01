import CasePreview from 'components/CasePreview';
import useCases from 'hooks/useCases';
import styles from './index.module.scss';
import useQueryParams from 'hooks/useQueryParams';
import InfiniteScroll from 'react-infinite-scroller';

function EventList({ scrollParentRef }) {
  const { query } = useQueryParams();
  const { data, loadMore, totalCount, hasNextPage, loading } = useCases({
    query,
  });
  return (
    <InfiniteScroll
        pageStart={0}
        loadMore={(page) => loadMore(page)}
        hasMore={hasNextPage}
        loader={<div className="row center py-4"><small className="fas white fa-spinner fa-pulse" /></div>}
        useWindow={false}
        getScrollParent={() => scrollParentRef.current}
    >
      <div className="px-4 white mb-4">案件數: {totalCount} </div>
      {!data.length && loading && <div className="row center py-4"><small className="fas white fa-spinner fa-pulse" /></div>}
      {data.map((c, i) => (
        <div key={`case-${c.id}-${i}`} className={styles.itemWrapper}>
          <CasePreview data={c} />
        </div>
      ))}
      {!hasNextPage && !loading && <div className="row center py-4 white">完</div>}
    </InfiniteScroll>
  );
}

export default EventList;
