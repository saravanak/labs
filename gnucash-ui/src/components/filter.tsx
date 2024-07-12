'use client';

import { useState } from 'react';
import { useFuzzySearchList, Highlight } from '@nozbe/microfuzz/react';

const cache = new WeakMap();

export default function Filter({ data }: any) {
  const [queryText, setQueryText] = useState('');
  const [accounts, setAccounts]: any = useState([]);

  // `useFuzzySearchList` simply wraps `createFuzzySearch` with memoization built in
  // NOTE: For best performance, `getText` and `mapResultItem` should be memoized by user
  const filteredList = useFuzzySearchList({
    list: data,
    // If `queryText` is blank, `list` is returned in whole
    queryText,
    // optional `getText` or `key`, same as with `createFuzzySearch`
    getText: (item: any) => [item.name],
    // arbitrary mapping function, takes `FuzzyResult<T>` as input
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => ({
      item,
      highlightRanges,
    }),
  });

  // Render `filteredList`'s labels with matching characters highlighted
  return (
    <div className='p-2 border border-indigo-600'>
      <input onChange={(v) => setQueryText(v.target.value)} value={queryText} />
      <div className='pt-4 overflow-auto max-h-48'>
        {filteredList.map(({ item, highlightRanges }) => (
          <div
            key={item.guid}
            onClick={(v) => setAccounts([...accounts, item])}
          >
            <span>
              <Highlight text={item.name} ranges={highlightRanges} />
            </span>
          </div>
        ))}
      </div>
      <h2 className=''> The selected list.</h2>
      {accounts.map((v: any) => {
        return <div key={v.guid}> {v.name}</div>;
      })}
    </div>
  );
}
