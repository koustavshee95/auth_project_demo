import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Input } from "../../components/common/input/Input";
import { Button } from "../../components/common/button/Button";
import { AuthServices } from "../../services/AuthServices";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    captcha: "",
    submit: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      email: "",
      password: "",
      captcha: "",
      submit: "",
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Captcha validation
    if (!formData.captcha) {
      newErrors.captcha = "Please enter the captcha";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const response = await AuthServices.login(formData);

    if (response.success) {
      // Store auth token and user info
      localStorage.setItem("authToken", "your-token-here"); // will get token from backend
      localStorage.setItem("userEmail", formData.email);
      // Navigate to home/dashboard page
      navigate("/home");
    } else {
      setErrors((prev) => ({
        ...prev,
        submit: response.error || "Login failed. Please try again.",
      }));
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <h2 className="card-title">Sign In To Continue</h2>

      {errors.submit && (
        <div className="submit-error">
          <p>{errors.submit}</p>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <Input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          name="email"
          error={errors.email}
        />
      </div>

      <div className="form-group">
        <div className="password-header">
          <label htmlFor="password">Password *</label>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <div className="password-input-wrapper">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
            name="password"
            error={errors.password}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      <div className="form-group">
        <div className="captcha-section">
          <label>Captcha *</label>
          <div className="captcha-display">
            <span className="captcha-text">ABCD</span>
            <Input
              type="text"
              placeholder="Enter Captcha"
              value={formData.captcha}
              onChange={(value) => handleInputChange("captcha", value)}
              name="captcha"
              error={errors.captcha}
            />
          </div>
        </div>
      </div>

      <Button
        text="Login"
        onClick={handleLogin}
        type="submit"
        loading={loading}
        variant="primary"
      />
    </div>
  );
};
