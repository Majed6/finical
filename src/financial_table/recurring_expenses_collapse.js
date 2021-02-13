import {Box, Collapse} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useState} from "react";
import RecurringExpensesCollapseTableRow from "./recurring_expenses_collapse_table_row";


export default function RecurringExpensesCollapse(props) {
    const [rows, setRows] = useState([{isTemplate: true, expense: '', times: '', multiplier: '', cost: ''}]);
    const onRowUpdate = function (newValue, changedIndex, changedCell) {
        let newTemplate = [];
        let updateRows = rows.map((row, index) => {
            if (index !== changedIndex) return row;
            if (row.isTemplate) {
                delete row.isTemplate;
                newTemplate = [{isTemplate: true, expense: '', times: '', multiplier: '', cost: ''}];
            }
            row[changedCell] = newValue;
            return row;
        }).concat(newTemplate);

        setRows(updateRows);
        props.onRowUpdate(updateRows.filter(row => !row.isTemplate && row.times && row.multiplier && row.cost), props.row.index, 'recurring_expenses');
    }

    return (
        <Collapse in={props.in} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <b>{props.row.goal} recurring expenses</b>
                <Table size="small" aria-label="recurring expenses">
                    <TableHead>
                        <TableRow>
                            <TableCell>Expense</TableCell>
                            <TableCell align="left">Recurrence</TableCell>
                            <TableCell align="left">Cost</TableCell>
                            <TableCell align="right">Yearly Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) =>
                            <RecurringExpensesCollapseTableRow key={index} row={row} index={index}
                                                               onRowUpdate={onRowUpdate}/>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Collapse>
    );
}
