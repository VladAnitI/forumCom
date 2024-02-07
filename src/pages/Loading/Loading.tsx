import { HashLoader } from "react-spinners";
import { useState, useEffect } from "react";
import styles from './Loading.module.css';

export function Loading() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <HashLoader className={styles.loadingSpinner} color='#27022c'loading={loading} size={300} />
      ) : (
        <></>
      )}
    </div>
  );
}