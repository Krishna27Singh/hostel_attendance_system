import { useState, useEffect } from "react";


const backendUrl= import.meta.env.VITE_BACKEND_URL;
const EditProfile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        // ✅ Load user details from localStorage or API
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser({ name: storedUser.name, email: storedUser.email, password: "" });
        }
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");  // ✅ Token le lo for authentication
            const response = await fetch(`${backendUrl}/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (data.success) {
                alert("Profile updated successfully!");
                localStorage.setItem("user", JSON.stringify(data.updatedUser)); // ✅ Updated user save in localStorage
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={user.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
