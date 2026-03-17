import api from "../api/axios";

export const login = async (credentials) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const res = await api.post("/auth/login", credentials);
    const data = res.data;
    console.log("Login response:", data.user);
    if (data?.token) {
        localStorage.setItem("token", data.token);

        const user = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role
        };

        localStorage.setItem("user", JSON.stringify(user));
    }

    return res;
};