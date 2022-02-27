import React,{ useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Order from "./Order/Order"
import useStyles from './styles';
import { Elements } from '@stripe/react-stripe-js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Products from '../Products/ProductsBootstrap';

const Orders = ({orders}) => {
    const classes = useStyles();
    const [orderCount, setOrderCount] = useState(1);

    function createData(OrderId, Price, Items, orderURL) {
        return {OrderId, Price, Items, orderURL};
      }

    const rows = [];

    orders.forEach(element => {
        if(typeof element.Products != "undefined")
            rows.push(createData(element._id,element.Price,element.Products.length,`/orders/${element._id}`));
    });

    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={2}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">OrderId</TableCell>
                        <TableCell align="left">Price&nbsp;(g)</TableCell>
                        <TableCell align="left">Items&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.OrderId}>
                        <TableCell align="left" component="th" scope="row">
                          <a className="btn btn-outline-dark" href={row.orderURL} role="button" style={{margin: '5px'}}>{row.OrderId}</a>
                        </TableCell>
                        <TableCell align="left">{row.Price}</TableCell>
                        <TableCell align="left">{row.Items}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        </main>
    )

}
export default Orders;