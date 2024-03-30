import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          InputProps={{ style: { borderRadius: '8px' } }}
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
          InputProps={{ style: { borderRadius: '8px' } }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
         Log In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
