import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Box,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API } from "../Helpers/Api";
import { Link } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      try {
        await axios
          .post(`${API}/api/auth/google/register`, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
          .then((res:any) => {
            if (res.status === 200) {
              sessionStorage.setItem("token", res.token);
              navigate("/dashboard");
            }
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
            if (error.response.status === 400) {
              setOpen(true);
              setMessage(error.response.data.message);
            }
          });
      } catch (error) {
        console.error("Google login error:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };
  const handleGoogleSignUpSuccess = async (credentialResponse: any) => {
    try {
      await axios
        .post(`${API}/api/auth/google/register`, {
          credential: credentialResponse.credential,
        })
        .then((res:any) => {
          if (res.status === 200) {
            sessionStorage.setItem("token", res.token);
            navigate("/dashboard");
          }
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 400 || error.response.status === 404 ) {
            setOpen(true);
            setMessage(error.response.data.message);
          }
        });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
    <Box
    sx={{
      backgroundImage: "linear-gradient(90deg, hsla(180, 33%, 88%, 1) 0%, hsla(310, 76%, 82%, 1) 50%, hsla(256, 83%, 72%, 1) 100%)",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Paper
    elevation={3}
    sx={{
      padding: 4,
      borderRadius: 4,
      backdropFilter: "blur( 6.5px )",
      backgroundColor: "rgba( 255, 255, 255, 0.25 )",
      boxShadow:" 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
    }}
  >
       <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
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
            InputProps={{
              style: { borderRadius: "8px" },
            }}
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
            InputProps={{
              style: { borderRadius: "8px" },
            }}
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
            InputProps={{
              style: { borderRadius: "8px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
         <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2, borderRadius: 2 }}
            >
            Sign Up
          </Button>
        </form>
        <Typography component="p" variant="body2">
          Already have an account?<Link to="/login">Log in</Link>
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <GoogleLogin
            onSuccess={handleGoogleSignUpSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
            text="signup_with"
          />
       </Box>
      </Container>
      </Paper>
      </Box>
  
      <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <Alert
        severity="error"
        onClose={() => setOpen(false)}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
    </>
  );
};

export default Signup;
