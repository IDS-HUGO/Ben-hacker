
"use client";
import { Box, Button, Typography, Card, CardContent, CardActions, Grid, Chip, CircularProgress } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  garantia: string;
  servicio: string;
  imagenUrl: string;
}

const colores = ["#003366", "#1e3a8a", "#c1121f"];

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/productos");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
        // Fallback a productos estáticos si falla la API
        setProductos([
          {
            id: 1,
            nombre: "Cuenta Netflix Premium",
            descripcion: "4 pantallas UHD, acceso inmediato, garantía 30 días.",
            garantia: "30 días",
            servicio: "Soporte 24/7, entrega instantánea",
            imagenUrl: "",
          },
          {
            id: 2,
            nombre: "Disney+ Familiar",
            descripcion: "Hasta 7 perfiles, contenido exclusivo, garantía 15 días.",
            garantia: "15 días",
            servicio: "Atención personalizada",
            imagenUrl: "",
          },
          {
            id: 3,
            nombre: "HBO Max Full",
            descripcion: "Acceso a estrenos, 3 dispositivos, garantía 20 días.",
            garantia: "20 días",
            servicio: "Soporte rápido",
            imagenUrl: "",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Box minHeight="100vh" bgcolor="#f5f7fa" display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={2}>
      <Box display="flex" alignItems="center" gap={2} mt={6} mb={2}>
        <Image src="/next.svg" alt="Logo" width={60} height={60} />
        <Typography variant="h3" fontWeight={900} color="#003366" letterSpacing={2}>
          Cuentas Ben-Hacker
        </Typography>
      </Box>
      <Typography variant="h6" color="#1e3a8a" mb={4}>
        Garantía, servicio excelente y entrega inmediata
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="center" maxWidth={900} mb={4}>
          {productos.map((p, idx) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card sx={{ borderRadius: 4, boxShadow: 3, border: `2px solid ${colores[idx % colores.length]}`, height: "100%" }}>
                {p.imagenUrl && (
                  <Box
                    component="img"
                    src={p.imagenUrl}
                    alt={p.nombre}
                    sx={{ width: "100%", height: 200, objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" fontWeight={700} color={colores[idx % colores.length]} gutterBottom>
                    {p.nombre}
                  </Typography>
                  <Typography variant="body2" mb={1}>{p.descripcion}</Typography>
                  <Chip label={`Garantía: ${p.garantia}`} color="primary" sx={{ bgcolor: colores[idx % colores.length], color: '#fff', mb: 1 }} />
                  <Typography variant="caption" color="text.secondary" display="block">{p.servicio}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    href={`https://wa.me/521234567890?text=Hola,%20quiero%20una%20cuenta%20de%20${p.nombre}`}
                    target="_blank"
                    fullWidth
                    sx={{ borderRadius: 3, fontWeight: 700 }}
                  >
                    Solicitar por WhatsApp
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

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
      <Typography variant="caption" color="#1e3a8a">
        © {new Date().getFullYear()} Cuentas Ben-Hacker. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
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
