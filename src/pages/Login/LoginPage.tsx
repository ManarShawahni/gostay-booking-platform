import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./LoginPage.module.css";

import {Input} from "../../components/common/Input";
import {Button} from "../../components/common/Button";
import LogoGoStay from "../../assets/LogoGoStay.svg";

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ username, password }, rememberMe);

    if (result?.userType === "Admin") navigate("/admin");
    else navigate("/");
  };

  return (
    <div className={styles.container}>
      
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <img src={LogoGoStay} alt="GoStay" className={styles.logo} />

          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              value={password}
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className={styles.rememberRow}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Remember me</span>
            </label>

            <Button fullWidth type="submit">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        <div className={styles.rightContent}>
          <div className={styles.rightTitle}>
            <span className={styles.typing}>Go Anywhere.</span>
            <span className={styles.typingDelay}>Stay Everywhere.</span>
          </div>

          <p className={`${styles.rightTagline} ${styles.fadeIn}`}>
            Discover amazing stays, just for you.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
