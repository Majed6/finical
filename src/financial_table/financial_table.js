import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TextField, Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useState, Fragment} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function withZakat(monthlyBudget, years, balance = 0, paidZakatOverYears = 0) {
    let yearlyBudget = monthlyBudget * 12;
    if (--years >= 0) {
        let zakatToBePaid = balance * 0.025;
        return withZakat(monthlyBudget, years, yearlyBudget + balance - zakatToBePaid, paidZakatOverYears + zakatToBePaid);
    } else {
        return {balance, paidZakatOverYears};
    }
}

function createData(goal, monthly_budget, in_years) {
    let zakated = withZakat(monthly_budget, in_years);
    return {goal, monthly_budget, in_years, "zakat": zakated.paidZakatOverYears, "total_budget": zakated.balance};
}

export default function FinancialTable() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        let goal = createData(document.getElementById("goal").value, 0, 0);
        rows.push(goal);
        handleClose();
    }
    const [rows, setRows] = useState([]);

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="goals table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Goal</TableCell>
                            <TableCell align="right">Monthly Budget</TableCell>
                            <TableCell align="right">Achieve in Years</TableCell>
                            <TableCell align="right">Zakat</TableCell>
                            <TableCell align="right">Total Budget</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.goal}>
                                <TableCell component="th" scope="row">
                                    {row.goal}
                                </TableCell>
                                <TableCell align="right">
                                    <TextField type="number" placeholder="Monthly Budget" onChange={(e) => {
                                        let changedIndex = index;
                                        setRows(
                                            rows.map((row, index) => {
                                                if (index !== changedIndex) return row
                                                return createData(row.goal, e.target.value || row.monthly_budget, row.in_years);
                                            }));
                                    }}/>
                                </TableCell>
                                <TableCell align="right">
                                    <TextField type="number" placeholder="Achieve in years" onChange={(e) => {
                                        let changedIndex = index;
                                        setRows(
                                            rows.map((row, index) => {
                                                if (index !== changedIndex) return row
                                                return createData(row.goal, row.monthly_budget, e.target.value || row.in_years);
                                            }));
                                    }}/>
                                </TableCell>
                                <TableCell align="right">{row.zakat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell align="right">{row.total_budget.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-goal">
                <DialogContent>
                    <TextField
                        autoFocus
                        id="goal"
                        label="Goal"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
        </Fragment>
    );
}
