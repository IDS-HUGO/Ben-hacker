"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("auth_token", "true"); 
        window.location.href = "/admin";
      } else {
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectarse con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fa">
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, minWidth: 320, border: "2px solid #003366" }}>
        <Typography variant="h5" fontWeight={700} color="#003366" mb={3} align="center">
          Iniciar Sesión
        </Typography>
        <Typography variant="body2" color="#1e3a8a" mb={3} align="center">
          Panel Administrador - Cuentas Ben-Hacker
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleLogin}>
          <TextField
            label="Usuario"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            disabled={loading}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3, bgcolor: "#003366", fontWeight: 700 }}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
          </Button>
        </form>
        
        <Typography variant="caption" color="#1e3a8a" display="block" mt={2} align="center">
          Credenciales: benhacker_admin@cuentas / BenH@cker2026Adm!nProd
        </Typography>
      </Paper>
    </Box>
  );
}
