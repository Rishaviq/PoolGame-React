import React, { useState } from "react";

type RegisterInfo = {
  username: string;
  userPassword: string;
  profileName: string;
};
type RegisterFormProps = {
  OnSubmit: (RegisterInfo: RegisterInfo) => void;
};
export default function RegisterForm({ OnSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    profileName: "",
    userPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    OnSubmit({
      username: formData.username,
      userPassword: formData.userPassword,
      profileName: formData.profileName,
    }); // Call the parent callback
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            required
            maxLength={50}
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profilename" className="form-label">
            Profile Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="profilename"
            name="profileName"
            required
            maxLength={50}
            value={formData.profileName}
            onChange={handleChange}
            placeholder="Enter your profile name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="userPassword"
            required
            maxLength={50}
            value={formData.userPassword}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-text mb-3 text-muted">
          <br />
          <strong>
            ChatGPT said that you should know that by registering you
            acknowledge that I would store your username and user ID in cookies
            and you won't be able to complain in person later.
          </strong>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}
