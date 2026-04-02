"use client";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function AdminPage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
        Panel de Administrador
      </Typography>
      <Typography variant="body1" mb={4}>
        Aquí podrás gestionar productos, cuentas y clientes.
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/">
        Ir a la landing
      </Button>
    </Box>
  );
}
