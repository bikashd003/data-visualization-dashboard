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
import { API } from "../Helpers/Api";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData.email,formData.password)
    if (formData.email || formData.password) {
      await axios.post(`${API}/api/auth/google/login`, {
        email: formData.email,
        Password: formData.password,
      })
        .then((res:any) => {
          console.log(res);
          if (res.status === 200) {
           navigate("/dashboard");
           sessionStorage.setItem("token", res.data.token);
          }

        })
        .catch((error) => {
          console.error(error);
          if (error) {
            setOpen(true);
            setMessage(error.response.data.message);
          }
        })
    }
  };
  const handleGoogleLoginUpSuccess = async (credentialResponse: any) => {
    try {
      await axios
        .post(`${API}/api/auth/google/login`, {
          credential: credentialResponse.credential,
        })
        .then((res:any) => {
          if (res.status === 200) {
            navigate("/dashboard");
            sessionStorage.setItem("token", res.data.token);
           }
        })
        .catch((error) => {
          console.error(error);
          if (error) {
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
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Log In
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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
              Log In
            </Button>
          </form>
          <Typography component="p" variant="body2">
            Don't have an account?
            <Link to="/">
              Sign up
            </Link>
          </Typography>
          <Box sx={{ mt: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginUpSuccess}
              onError={() => {
                setOpen(true);
                setMessage("Login Failed");
              }}
              text="signin_with"
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

export default Login;
