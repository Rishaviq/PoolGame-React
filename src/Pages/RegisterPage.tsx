import RegisterForm from "../Components/RegisterForm.tsx";
import axios from "../api/axios";

export default function Register() {
  const HandleRegister = async (registerInfo: {
    username: string;
    userPassword: string;
    profileName: string;
  }) => {
    try {
      const response = await axios.post("register", registerInfo);

      if (response.status !== 200) {
        const error = await response.statusText;
        throw new Error(`Login failed: ${error}`);
      }
      alert("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <RegisterForm OnSubmit={HandleRegister} />
      </div>
    </div>
  );
}
