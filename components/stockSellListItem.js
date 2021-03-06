import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import { ListItem, Button, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip';
import { stockSell } from '../redux/actions/stocksActions'


const useStyles = makeStyles((theme) => ({
  sellButton: {
    marginTop: '4px',
    background: '#e75480'
  },
  quantityField: {
    marginRight: '10px'
  },
  stockText: {
    marginRight: '10px'
  },
  chipColor: {
    backgroundColor: '#014d4e',
    color: 'white',
    marginRight: '10px'
  }
}));

export default function StockPurchaseListItem(props) {
  const stock = props.stock;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0)


  function handleSell() {
      dispatch(stockSell(stock.id, Math.max(stock.owned, quantity)));
  }

  return (
    <>
      <ListItem
        key={stock.id}>
        <ListItemText
          className={classes.stockText}
          primary={stock.name}
          secondary={'$' + stock.price} />
        <Tooltip placement="left" title="Amount of stock owned" aria-label="Amount of stock owned">
        <Chip size="small" label={stock.owned} className={classes.chipColor} /></Tooltip>
        <Tooltip placement="left" title="Amount to sell" aria-label="Amount to sell">
        <TextField required
          onChange={event => { setQuantity(parseInt(event.target.value)) }}
          style={{ width: '20%' }}
          InputProps={{
            inputProps: {
              max: stock.owned, min: 1
            }
          }}
          id={stock.id}
          label="Quantity"
          variant="outlined"
          type="number"
          className={classes.quantityField} />

        </Tooltip>

        <TextField disabled
          label="Total"
          value={"$" + (stock.price * quantity).toFixed(2)} />

        <Button
          className={classes.buyButton}
          variant="contained"
          color="primary"
          onClick={() => handleSell()}
        >Sell</Button>
      </ListItem>
    </>
  )
}
