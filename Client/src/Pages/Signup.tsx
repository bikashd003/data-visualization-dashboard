import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API } from "../Helpers/Api";
interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (valid) {
      console.log("Form submitted:", formData);
      navigate("/login");
    } else {
      setErrors(newErrors);
    }
  };
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      await axios
        .post(`${API}/api/auth/google`, {
          credential: credentialResponse.credential,
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

 
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          autoComplete="off"
          margin="normal"
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{ style: { borderRadius: "8px" } }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          autoComplete="off"
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{ style: { borderRadius: "8px" } }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{ style: { borderRadius: "8px" } }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
      <hr />
      <div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
          text="signup_with"
        />
      </div>
    </Container>
  );
};

export default Signup;
