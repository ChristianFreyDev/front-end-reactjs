import React, { useEffect, useState } from 'react';
import { useAppBar } from "@/contexts/AppBarContext";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, Slide, Snackbar, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';
import api from '../../services/api';
import './Cidade.css';
import Alerta from '/src/components/Alert/Alerta.jsx';
import Table from '@/components/Table/Table';
import Filter from '@/components/Filter/Filter';

function Cidade() {
  const { setTitle } = useAppBar();
  const [cidades, setCidades] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [ibge, setIBGE] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    setTitle("Cidades");
  }, []);

  useEffect(() => {
    async function getCidades() {
      const cidadesFromApi = await api.get('/Cidade/ListarCidades');
      setCidades(cidadesFromApi.data.dados);
    }
    getCidades();
  }, []);

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

  const search = (mensagem) => {
    Alerta.Sucesso(mensagem)
  };

  return (
    <div className='cidade-container'>
      <Filter
        inputs={[
          { col: 2, label: 'ID', value: id, onChange: (e) => setId(e.target.value) },
          { col: 5, label: 'Cidade', value: nome, onChange: (e) => setNome(e.target.value) },
          { col: 2, label: 'IBGE', value: ibge, onChange: (e) => setIBGE(e.target.value) },
          { col: 3, label: 'Estado', value: estado, onChange: (e) => setEstado(e.target.value) },
        ]}
      />

      <Button onClick={() => search("Filtra os registros")} startIcon={<SearchIcon />} variant="contained"> BUSCAR </Button>

      <Table
        columns={[
          { title: 'ID', key: 'id', value: item => item.id, align: 'right' },
          { title: 'Cidade', key: 'nome', value: item => item.nome, align: 'left' },
          { title: 'IBGE', key: 'ibge', value: item => item.ibge, align: 'right' },
          { title: 'Estado', key: 'estado.nome', value: item => `${item.estado.nome} - ${item.estado.sigla}`, align: 'left' },
        ]}
        data={cidades}
        defaultOrder={'id'}
        beforeColumns={() => <div><span>TESTE 1</span></div>}
        afterColumns={() => <div><span>TESTE 2</span></div>}
      />

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
            Tem certeza que deseja excluir a cidade <br /> <strong>{cidadeSelecionada?.nome}</strong>?
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
    </div>
  );
}

export default Cidade;
