import { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/admin-dashboard");
    } catch (e) {
      setError("Invalid login. Try again.");
    }
  };

  return (
    <section className="max-w-sm mx-auto mt-16 p-8 bg-white text-black shadow rounded">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#AA7454] via-[#FF8C42] to-[#FFD700] text-gray-700 font-semibold py-2 rounded"
        >
          Login
        </button>
      </form>
    </section>
  );
};
export default AdminLogin;
