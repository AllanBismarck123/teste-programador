import React, { useState } from 'react';
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
import { ArrowDropUp } from '@mui/icons-material';

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

    const toggleComponent = () => {
        setShowComponent((prevShowComponent) => !prevShowComponent);
    };

    function getIconShow() {
        return showComponent ?
            <ArrowDropDownIcon style={{ color: "white" }} fontSize='medium' /> :
            <ArrowDropUp style={{ color: "white" }} fontSize='medium' />;
    }

    return (
        <TableContainer align='center' component={Paper} sx={{ maxWidth: 500 }}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Página {props.index}</StyledTableCell>
                        <StyledTableCell align="right"><IconButton onClick={toggleComponent} size='medium' >
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
                        {props.tags.tags.map((row) => (
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
        </TableContainer>
    );
}
