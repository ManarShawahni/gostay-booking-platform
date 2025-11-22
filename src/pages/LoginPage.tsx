import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login({ username, password });

    if (result?.userType === "Admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-6">Login</h1>

      <form 
        onSubmit={handleSubmit}
        className="flex gap-3 items-center bg-gray-800 p-6 rounded-lg"
      >
        <input
          className="px-3 py-2 bg-gray-700 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />

        <input
          type="password"
          className="px-3 py-2 bg-gray-700 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default LoginPage;
