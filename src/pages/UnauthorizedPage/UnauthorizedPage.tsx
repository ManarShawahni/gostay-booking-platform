import { useNavigate } from 'react-router-dom';
import styles from './UnauthorizedPage.module.css';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Access Denied</h1>
        <p className={styles.message}>
          You don't have permission to access this page.
        </p>
        <p className={styles.hint}>
          This area is restricted to administrators only.
        </p>
        <button 
          className={styles.button}
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;