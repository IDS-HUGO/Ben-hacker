"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  garantia: string;
  servicio: string;
  imagenUrl: string;
}

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  pagos: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    garantia: "",
    servicio: "",
    imagenUrl: "",
  });

  const [clienteForm, setClienteForm] = useState({
    nombre: "",
    telefono: "",
    pagos: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      window.location.href = "/login";
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, clientRes] = await Promise.all([
        fetch("http://localhost:3001/api/productos"),
        fetch("http://localhost:3001/api/clientes"),
      ]);
      
      setProductos(await prodRes.json());
      setClientes(await clientRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProducto = async () => {
    if (!formData.nombre || !formData.descripcion) {
      setMessage("Completa todos los campos requeridos");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:3001/api/productos/${editingId}`
        : "http://localhost:3001/api/productos";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchData();
        setFormData({ nombre: "", descripcion: "", garantia: "", servicio: "", imagenUrl: "" });
        setEditingId(null);
        setDialogOpen(false);
        setMessage(editingId ? "Producto actualizado" : "Producto creado");
      }
    } catch (error) {
      setMessage("Error al guardar producto");
    }
  };

  const handleDeleteProducto = async (id: number) => {
    if (confirm("¿Eliminar este producto?")) {
      try {
        await fetch(`http://localhost:3001/api/productos/${id}`, { method: "DELETE" });
        fetchData();
        setMessage("Producto eliminado");
      } catch (error) {
        setMessage("Error al eliminar");
      }
    }
  };

  const handleAddCliente = async () => {
    if (!clienteForm.nombre || !clienteForm.telefono) {
      setMessage("Completa nombre y teléfono");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteForm),
      });

      if (res.ok) {
        fetchData();
        setClienteForm({ nombre: "", telefono: "", pagos: "" });
        setMessage("Cliente agregado");
      }
    } catch (error) {
      setMessage("Error al agregar cliente");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;

  return (
    <Box minHeight="100vh" bgcolor="#f5f7fa" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={700} color="#003366">
          Panel Administrador
        </Typography>
        <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {message && (
        <Alert severity={message.includes("Error") ? "error" : "success"} onClose={() => setMessage("")} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Paper sx={{ mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Productos" />
          <Tab label="Clientes" />
        </Tabs>
      </Paper>

      {tab === 0 && (
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setEditingId(null); setFormData({ nombre: "", descripcion: "", garantia: "", servicio: "", imagenUrl: "" }); setDialogOpen(true); }}
            sx={{ mb: 2, bgcolor: "#003366" }}
          >
            Nuevo Producto
          </Button>

          <Grid container spacing={2}>
            {productos.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card sx={{ border: "2px solid #003366" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} color="#003366">{p.nombre}</Typography>
                    <Typography variant="body2">{p.descripcion}</Typography>
                    <Typography variant="caption">Garantía: {p.garantia}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditingId(p.id);
                        setFormData(p);
                        setDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteProducto(p.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Card sx={{ mb: 2, p: 2, bgcolor: "white" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  fullWidth
                  value={clienteForm.nombre}
                  onChange={(e) => setClienteForm({ ...clienteForm, nombre: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Teléfono"
                  fullWidth
                  value={clienteForm.telefono}
                  onChange={(e) => setClienteForm({ ...clienteForm, telefono: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Estado de Pagos"
                  fullWidth
                  value={clienteForm.pagos}
                  onChange={(e) => setClienteForm({ ...clienteForm, pagos: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth onClick={handleAddCliente} sx={{ bgcolor: "#003366" }}>
                  Agregar Cliente
                </Button>
              </Grid>
            </Grid>
          </Card>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#003366" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>Nombre</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>Teléfono</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>Pagos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>{c.nombre}</TableCell>
                    <TableCell>{c.telefono}</TableCell>
                    <TableCell>{c.pagos}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Editar" : "Nuevo"} Producto</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
          <TextField
            label="Garantía"
            fullWidth
            margin="normal"
            value={formData.garantia}
            onChange={(e) => setFormData({ ...formData, garantia: e.target.value })}
          />
          <TextField
            label="Servicio"
            fullWidth
            margin="normal"
            value={formData.servicio}
            onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
          />
          <TextField
            label="URL Imagen"
            fullWidth
            margin="normal"
            value={formData.imagenUrl}
            onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddProducto} variant="contained" sx={{ bgcolor: "#003366" }}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
