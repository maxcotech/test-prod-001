import React, { useEffect, useState } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';
import { debounced } from '../utils/value.utils';
import Shimmer from '../components/Shimmer';
import Pagination from '../components/Pagination';
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style, data }) => {
  const item = data[index];
  return (
    <li key={item.id}>
      <Link to={'/items/' + item.id}>{item.name}</Link>
    </li>
  );
};

function Items() {
  const { items, fetchItems } = useData();
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    limit: 10,
    skip: 0
  });

  useEffect(() => {
    let clearNetwork;
    // Intentional bug: setState called after component unmount if request is slow //chisom: fixed
    (async () => {
      clearNetwork = await fetchItems(setLoading, query)
    })()
    // Clean‑up to avoid memory leak (candidate should implement) //chisom: fixed
    return () => {
      if (clearNetwork && typeof clearNetwork === "function") {
        clearNetwork()
      }
    };
  }, [fetchItems, query]);


  return (
    <div className='page-container'>
      <div className='content'>
        <div style={{ marginBottom: "20px" }} className='search-wrapper'>
          <input type="search" className='search-input' placeholder='search items...' onChange={(e) => debounced(e.target.value, (q) => setQuery({ ...query, q }), 500)} />
        </div>
        {
          (loading) ?
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {
                [...Array(5)].map(() => <Shimmer width='50%' />)
              }

            </div> : <>
              {
                ((items?.data?.length ?? 0) === 0) ? <p>Nothing to see here</p> :
                  <ul className='link-list'>
                    <List height={600}            // height of the list viewport
                      itemCount={(items?.data?.length ?? 0)} // total number of items
                      itemSize={50}            // height of each row
                      width="100%"             // or fixed width like 300
                      itemData={items?.data ?? []}>
                      {Row}
                    </List>
                  </ul>
              }
            </>

        }

        <Pagination onPageChange={(skip, limit) => {
          console.log('pagination ', 's', skip, 'l', limit)
          setQuery({ ...query, skip, limit })
        }} total={items.total} take={query.take} skip={query.skip} />
      </div>

    </div>
  );
}

export default Items;