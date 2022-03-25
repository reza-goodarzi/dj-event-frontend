import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import styles from "./AuthForm.module.css";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Dont have an account? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
