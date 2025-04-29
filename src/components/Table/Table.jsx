import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Pagination, Stack, TableSortLabel
} from '@mui/material';
import '../Table/Table.css';

function Tabela({ data, columns, defaultOrder, beforeColumns, afterColumns }) {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    handleSort(defaultOrder)
  },[])

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = data.sort((a, b) => {
    if (!sortConfig.key) return 0;

    const getValue = (obj, key) => key.split('.').reduce((o, k) => o?.[k], obj);

    let aValue = getValue(a, sortConfig.key);
    let bValue = getValue(b, sortConfig.key);

    if (!isNaN(Number(aValue))) {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className='table-container'>
      <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {'before'}
              {columns.map((item, index) => (
                <TableCell key={index} align={item.align}>
                  <TableSortLabel
                    active={sortConfig.key === item.key}
                    direction={sortConfig.direction}
                    onClick={() => handleSort(item.key)}
                  >
                    {item.title}
                  </TableSortLabel>
                </TableCell>
              ))}
              { 'after' }
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedData.map((item, index) => (
              <TableRow key={index}>
                { 'before' }
                {columns.map((column, index) => (
                  <TableCell key={index} align={column.align}>
                    {column.value(item)}
                  </TableCell>
                ))}
                { 'after' }
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
  );
}

export default Tabela;
