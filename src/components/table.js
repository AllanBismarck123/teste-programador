import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';
import { ArrowDropUp, Delete } from '@mui/icons-material';
import DeleteDialog from './deleteDialog';
import AlertDialog from './dialog';
import client from '../axios/client.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: alpha(theme.palette.primary.light, 0.1),
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables(props) {
    const [showComponent, setShowComponent] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [dialogResult, setDialogResult] = useState(false);

    const msg = "Tem certeza que deseja excluir essa página?";

    var msgAlert;

    const deletePage = (id) => {
        client.delete(`/documento/${id}`)
        .then((res) => {
            if(res.status === 200) {
                msgAlert = "Documento deletado com sucesso.";
                setOpenAlert(true);
            } else {
                msgAlert = "Documento não encontrado.";
                setOpenAlert(true);
            }
        })
        .catch((error) => {
            msgAlert = `Erro na requisição, ${error}`;
            setOpenAlert(true);
        })
    }

    const toggleComponent = () => {
        setShowComponent((prevShowComponent) => !prevShowComponent);
    };

    const handleClickOpen = () => {
        setOpen(true);
      };

    function getIconShow() {
        return showComponent ?
            <ArrowDropDownIcon style={{ color: "white" }} fontSize='medium' /> :
            <ArrowDropUp style={{ color: "white" }} fontSize='medium' />;
    }

    useEffect(() => {
        if (dialogResult) {
          deletePage(props.page._id);
          window.location.reload();
        }
      }, [dialogResult]);

    return (
        <TableContainer align='center' component={Paper} sx={{ maxWidth: 500 }}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {props.index === 0 ? <StyledTableCell>Última página salva</StyledTableCell> : <StyledTableCell>Página {props.index}</StyledTableCell>}
                        <StyledTableCell align="right"><IconButton onClick={handleClickOpen} size='small' >
                            <Delete style={{ color: '#693BB6'}}/></IconButton><IconButton onClick={toggleComponent} size='small' >
                            {getIconShow()}</IconButton></StyledTableCell>
                    </TableRow>
                    {showComponent &&
                        <TableRow>
                            <StyledTableCell>Tag</StyledTableCell>
                            <StyledTableCell align="right">Repetições</StyledTableCell>
                        </TableRow>
                    }
                </TableHead>
                {showComponent &&
                    <TableBody>
                        {props.page.tags.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.numberTimes}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                }
            </Table>
            <DeleteDialog open={open} setOpen={setOpen} msg={msg} setDialogResult={setDialogResult}/>
            <AlertDialog open={openAlert} setOpen={setOpenAlert} msg={msgAlert} />
        </TableContainer>
    );
}
