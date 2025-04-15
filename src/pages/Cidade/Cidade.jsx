import React, { useEffect, useState } from 'react';
import { useAppBar } from "@/contexts/AppBarContext";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Pagination, Stack, IconButton, Tooltip, TableSortLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Slide, Snackbar, Alert
} from '@mui/material';
import { VisibilityOutlined, ModeEditOutline, DeleteOutline } from '@mui/icons-material';
import api from '../../services/api';
import './Cidade.css';

function Cidade() {
  const { setTitle } = useAppBar();
  const [cidades, setCidades] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setTitle("Cidades");
  }, []);

  useEffect(() => {
    async function getCidades() {
      const cidadesFromApi = await api.get('/Cidade/ListarCidades');
      setCidades(cidadesFromApi.data.dados);
    }
    getCidades();
    handleSort('id');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (openDeleteModal && e.key === 'Enter') {
        confirmDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openDeleteModal, cidadeSelecionada]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCidades = [...cidades].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const getValue = (obj, key) => key.split('.').reduce((o, k) => o?.[k], obj);

    let aValue = getValue(a, sortConfig.key);
    let bValue = getValue(b, sortConfig.key);

    if (sortConfig.key === 'ibge') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedCidades.length / pageSize);
  const cidadesPaginadas = sortedCidades.slice((page - 1) * pageSize, page * pageSize);

  const handleView = (cidade) => {
    console.log("Visualizar cidade:", cidade);
  };

  const handleEdit = (cidade) => {
    console.log("Editar cidade:", cidade);
  };

  const handleDelete = (cidade) => {
    setCidadeSelecionada(cidade);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!cidadeSelecionada) return;
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      await api.delete(`/Cidade/ExcluirCidade?cidadeId=${cidadeSelecionada.id}`);
      setCidades(prev => prev.filter(c => c.id !== cidadeSelecionada.id));
      setOpenDeleteModal(false);
      setSnackbar({ open: true, message: `Cidade ${cidadeSelecionada.nome} excluída com sucesso.`, severity: 'success' });
    } catch (error) {
      setOpenDeleteModal(false);
      console.error('Erro ao excluir cidade:', error);
      setSnackbar({ open: true, message: `Erro ao excluir a cidade ${cidadeSelecionada.nome}.`, severity: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
    setCidadeSelecionada(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Stack spacing={2} width="90%" alignSelf={'normal'} marginTop={10}>
      <div className='table-container'>     
        <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortConfig.key === 'id'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'nome'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('nome')}
                  >
                    Cidade
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortConfig.key === 'ibge'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('ibge')}
                  >
                    IBGE
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'estado.nome'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('estado.nome')}
                  >
                    Estado
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cidadesPaginadas.map((cidade) => (
                <TableRow key={cidade.id}>
                  <TableCell align="center">
                    <Tooltip title="Visualizar">
                      <IconButton className="icon-button-table" onClick={() => handleView(cidade)}>
                        <VisibilityOutlined className="icon-view" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleEdit(cidade)}>
                        <ModeEditOutline className="icon-edit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton onClick={() => handleDelete(cidade)}>
                        <DeleteOutline className="icon-delete" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">{cidade.id}</TableCell>
                  <TableCell>{cidade.nome}</TableCell>
                  <TableCell align="right">{cidade.ibge}</TableCell>
                  <TableCell>{cidade.estado.nome} - {cidade.estado.sigla}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      </div>
      
      <Dialog
        open={openDeleteModal}
        onClose={!isDeleting ? cancelDelete : undefined}
        disableEscapeKeyDown={isDeleting}
        TransitionComponent={Slide}
        keepMounted
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle >Confirmação de exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a cidade <br/> <strong>{cidadeSelecionada?.nome}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={cancelDelete} 
            color="inherit" 
            variant='outlined' 
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            loading={isDeleting}
            variant="contained"
            color="error"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Cidade;
