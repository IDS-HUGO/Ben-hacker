"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica real de autenticación
    if (username === "admin" && password === "admin123") {
      window.location.href = "/admin";
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fa">
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, minWidth: 320 }}>
        <Typography variant="h5" fontWeight={700} color="primary" mb={2} align="center">
          Iniciar sesión (Admin)
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Usuario"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" mt={1} align="center">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
