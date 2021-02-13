import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {IconButton, TextField} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Fragment, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import RecurringExpensesCollapse from "./recurring_expenses_collapse";


const useStyles = makeStyles((theme) => ({
    collapsibleTable: {paddingBottom: 0, paddingTop: 0},
}));

export default function FinancialTableRow(props) {
    const [collapsed, setCollapsed] = useState(true);
    let row = {...props.row, "index": props.index};
    const classes = useStyles();
    let collapsibleRow = row.hasRecurringExpenses;
    return (
        <Fragment>
            <TableRow>
                <TableCell align="left">
                    {collapsibleRow ?
                        <IconButton aria-label="expand row" size="small" onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                        </IconButton> : null
                    }
                </TableCell>
                <TableCell align="left">
                    {row.goal}
                </TableCell>
                <TableCell align="left">
                    <TextField type="number" placeholder="Monthly Budget"
                               onChange={(e) => props.onRowUpdate(e.target.value, row.index, "monthly_budget")}/>
                </TableCell>
                <TableCell align="left">
                    <TextField type="number" placeholder="Achieve in years"
                               onChange={(e) => props.onRowUpdate(e.target.value, row.index, "in_years")}/>
                </TableCell>
                <TableCell align="right">
                    {row.zakat.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </TableCell>
                <TableCell align="right">
                    {row.total_budget.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </TableCell>
            </TableRow>
            {collapsibleRow ?
                <TableRow>
                    <TableCell className={classes.collapsibleTable} colSpan={6}>
                        <RecurringExpensesCollapse row={row} in={!collapsed} onRowUpdate={props.onRowUpdate}/>
                    </TableCell>
                </TableRow> : null
            }
        </Fragment>
    );
}
