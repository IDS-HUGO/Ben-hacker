
"use client";
import { Box, Button, Typography, Card, CardContent, CardActions, Grid, Chip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import Link from "next/link";

const productos = [
  {
    id: 1,
    nombre: "Cuenta Netflix Premium",
    descripcion: "4 pantallas UHD, acceso inmediato, garantía 30 días.",
    garantia: "30 días",
    servicio: "Soporte 24/7, entrega instantánea",
    color: "#003366"
  },
  {
    id: 2,
    nombre: "Disney+ Familiar",
    descripcion: "Hasta 7 perfiles, contenido exclusivo, garantía 15 días.",
    garantia: "15 días",
    servicio: "Atención personalizada",
    color: "#1e3a8a"
  },
  {
    id: 3,
    nombre: "HBO Max Full",
    descripcion: "Acceso a estrenos, 3 dispositivos, garantía 20 días.",
    garantia: "20 días",
    servicio: "Soporte rápido",
    color: "#c1121f"
  },
];

export default function Home() {
  return (
    <Box minHeight="100vh" bgcolor="#f5f7fa" display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={2}>
      <Box display="flex" alignItems="center" gap={2} mt={6} mb={2}>
        <Image src="/next.svg" alt="Logo" width={60} height={60} />
        <Typography variant="h3" fontWeight={900} color="#003366" letterSpacing={2}>
          Cuentas Ben-Hacker
        </Typography>
      </Box>
      <Typography variant="h6" color="#1e3a8a" mb={2}>
        Garantía, servicio excelente y entrega inmediata
      </Typography>
      <Grid container spacing={3} justifyContent="center" maxWidth={900} mb={4}>
        {productos.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card sx={{ borderRadius: 4, boxShadow: 3, border: `2px solid ${p.color}` }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} color={p.color} gutterBottom>
                  {p.nombre}
                </Typography>
                <Typography variant="body1" mb={1}>{p.descripcion}</Typography>
                <Chip label={`Garantía: ${p.garantia}`} color="primary" sx={{ bgcolor: p.color, color: '#fff', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">{p.servicio}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<WhatsAppIcon />}
                  href="https://wa.me/521234567890?text=Hola,%20quiero%20una%20cuenta%20de%20streaming"
                  target="_blank"
                  sx={{ borderRadius: 3, fontWeight: 700 }}
                >
                  Solicitar por WhatsApp
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" gap={2} mb={6}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LoginIcon />}
          component={Link}
          href="/login"
          sx={{ borderRadius: 3, fontWeight: 700, bgcolor: "#003366" }}
        >
          Login Administrador
        </Button>
        <Button
          variant="outlined"
          color="error"
          href="https://wa.me/521234567890?text=Hola,%20quiero%20más%20información%20de%20Cuentas%20Ben-Hacker"
          target="_blank"
          sx={{ borderRadius: 3, fontWeight: 700, borderColor: "#c1121f", color: "#c1121f" }}
        >
          Contacto WhatsApp
        </Button>
      </Box>
      <Typography variant="caption" color="#1e3a8a" mb={2}>
        © {new Date().getFullYear()} Cuentas Ben-Hacker. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
