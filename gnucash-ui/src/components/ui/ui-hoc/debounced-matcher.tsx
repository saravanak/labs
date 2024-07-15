import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useRef, useState } from 'react';

export default function useAsyncValidation({ validatorUrlFor, mutation }: any) {
  const [matches, setMatches] = useState<any>([]);

  const ongoingQueries = useRef<any>([]);

  const validator = async (spaceName: string) => {
    try {
      ongoingQueries.current.forEach((ac: any) => ac.abort('old query'));
      ongoingQueries.current = [];
    } catch (error) {}
    const ac = new AbortController();
    ongoingQueries.current.push(ac);

    if (spaceName.trim().length == 0) {
      return [];
    }

    mutation.reset();
    const result = await fetch(validatorUrlFor(spaceName), {
      signal: ac.signal,
    });

    const jsonResponse = await result.json();
    setMatches(jsonResponse.result && jsonResponse.result?.data.json);
    return jsonResponse.result && jsonResponse.result.data.json;
  };

  const debouncedAsync = AwesomeDebouncePromise(async (spaceName) => {
    await validator(spaceName);
    return true;
  }, 500);

  return [debouncedAsync, matches];
}
