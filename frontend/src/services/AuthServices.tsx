const API_BASE_URL = "http://localhost:8000/api";

export interface LoginCredentials {
  email: string;
  password: string;
  captcha: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    token?: string;
  };
  error?: string;
}

export const AuthServices = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },

  async logout(): Promise<void> {
    // Clear any stored tokens/session
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  },

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  },
};
