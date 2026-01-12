import { useState } from "react";
import api from "../../services/apiClient.js";

export default function Login() {
    const [e, p] = [useState(""), useState("")]; const submit = async x => { x.preventDefault(); const r = await api.post("/login.php", { email: e[0], password: p[0] }); if (r.data.token) localStorage.setItem("token", r.data.token), window.location.href = "/"; };
    return (<div className="flex h-screen justify-center items-center bg-gray-100">
        <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow w-80">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={e[0]} onChange={x => e[1](x.target.value)} />
            <input className="w-full p-2 border rounded mb-3" placeholder="Password" type="password" value={p[0]} onChange={x => p[1](x.target.value)} />
            <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
    </div>);
}
