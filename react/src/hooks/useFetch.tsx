import react ,{useCallback, useState} from 'react';

interface argTs {
  [key: string]: any
}

export default function fetch(args:argTs) {

  const [data, setData] = useState([]);
  const [loading, setLoadiing] = useState(false);
  const [error, setError] = useState(false);


  const fetchFn = useCallback( async () => {
    let res = await fetch(args.url, args.data); // 为啥报错
  }, [])
}