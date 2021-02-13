import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Checkbox, Fab, FormControlLabel, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Fragment, useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FinancialTableRow from "./financial_table_row";

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

function createData({
                        hasRecurringExpenses = false,
                        goal = "",
                        monthly_budget = 0,
                        in_years = 0,
                        recurring_expenses = []
                    }) {
        let recurring_expenses_monthly_total = recurring_expenses.reduce((accumulator, recurring_expense) => {
            let daily_cost = recurring_expense.cost / (recurring_expense.multiplier / recurring_expense.times);
            return accumulator + (daily_cost * 30.436875);
        }, 0);

    let zakated = withZakat(monthly_budget - recurring_expenses_monthly_total, in_years);
    return {
        hasRecurringExpenses,
        goal,
        monthly_budget,
        in_years,
        "zakat": zakated.paidZakatOverYears,
        "total_budget": zakated.balance,
        recurring_expenses
    };
}

export default function FinancialTable() {
    const classes = useStyles();
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [rows, setRows] = useState([]);

    const handleClickOpen = () => {
        setShowAddDialog(true);
    };
    const handleClose = () => {
        setShowAddDialog(false);
    };
    const handleAdd = () => {
        let goal = document.getElementById("goal").value;
        let hasRecurringExpenses = document.getElementById("hasRecurringExpenses").checked;
        let row = createData({hasRecurringExpenses, goal, monthly_budget: 0, in_years: 0});
        rows.push(row);
        handleClose();
    }
    const onRowUpdate = (newValue, changedIndex, changedCell) => {
        setRows(rows.map((row, index) => {
            if (index !== changedIndex) return row;
            row[changedCell] = (newValue || row[changedCell]);
            return createData({...row});
        }));
    };

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="goals table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Goal</TableCell>
                            <TableCell align="left">Monthly Budget</TableCell>
                            <TableCell align="left">Achieve in Years</TableCell>
                            <TableCell align="right">Zakat</TableCell>
                            <TableCell align="right">Total Budget</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) =>
                            <FinancialTableRow key={index} row={row} index={index} onRowUpdate={onRowUpdate}/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={showAddDialog} onClose={handleClose} aria-labelledby="add-goal">
                <DialogContent>
                    <TextField
                        autoFocus
                        id="goal"
                        label="Goal"
                        type="text"
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="hasRecurringExpenses"
                                name="hasRecurringExpenses"
                                color="primary"
                            />
                        }
                        label="Has Recurring Expenses"
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
