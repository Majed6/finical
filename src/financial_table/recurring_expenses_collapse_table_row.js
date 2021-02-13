import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {FormGroup, MenuItem, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    compact: {width: "100px"},
}));

export default function RecurringExpensesCollapseTableRow(props) {
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell align="left">
                <TextField placeholder="Expense" value={props.row.expense}
                           onChange={(e) => props.onRowUpdate(e.target.value, props.index, "expense")}/>
            </TableCell>
            <TableCell align="left">
                <FormGroup row={true}>
                    <TextField value={props.row.times} className={classes.compact} type="number"
                               placeholder="Times"
                               onChange={(e) => props.onRowUpdate(e.target.value, props.index, "times")}/>
                    <Select value={props.row.multiplier}
                            onChange={(e) => props.onRowUpdate(e.target.value, props.index, "multiplier")}>
                        <MenuItem value={1}>Daily</MenuItem>
                        <MenuItem value={30.436875}>Monthly (30 days)</MenuItem>
                        <MenuItem value={365.25}>Yearly (365 days)</MenuItem>
                    </Select>
                </FormGroup>
            </TableCell>
            <TableCell align="left">
                <TextField value={props.row.cost} type="number" placeholder="Cost"
                           onChange={(e) => props.onRowUpdate(e.target.value, props.index, "cost")}/>
            </TableCell>
            <TableCell align="right">
                {Number.parseFloat(props.row.cost / (props.row.multiplier / props.row.times) * 365.25 || 0)
                    .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
            </TableCell>
        </TableRow>
    )
}
