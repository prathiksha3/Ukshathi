import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // Default role: Employee
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmployee =
      role === "employee" &&
      email === "employee@example.com" &&
      password === "password123";
    const validAdmin =
      role === "admin" &&
      email === "prathi@gmail.com" &&
      password === "prathi";

    if (validEmployee || validAdmin) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cepr.org/sites/default/files/styles/16_9_small/public/2023-08/AdobeStock_609595064.jpeg?itok=iwjtIZkQ')",
      }}
    >
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-xl w-96 transform transition duration-300 hover:scale-105 hover:shadow-[0px_4px_20px_rgba(0,255,255,0.5)]">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Inventory Login
        </h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded bg-white text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white p-3 rounded-md font-semibold hover:from-teal-500 hover:to-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
