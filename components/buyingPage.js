import { makeStyles } from '@material-ui/core/styles';
import React, {useRef, useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { List, ListItem, Button, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buyButton: {
    marginTop: '4px'
  },
  quantityField: {
    marginRight: '10px'
  },
  stockText: {
    marginRight: '10px'
  }
}));

export default function BuyingPage(props) {
  const classes = useStyles();
  let stockList = []
  for(let i=0; i<props.stocks.length; i++){
    const stockId = props.stocks[i].id
    const stockName = props.stocks[i].name
    const pricePerShare = props.stocks[i].cost
    const [quantity, setQuantity] = useState(0)
    stockList.push(
      <ListItem
        key={stockId}>
        <ListItemText
          className={classes.stockText}
          primary={stockName}
          secondary={pricePerShare}/>
          <TextField required
            onChange={e => { setQuantity(parseInt(e.target.value)) }}
            id={stockId}
            label="Quantity"
            variant="outlined"
            className={classes.quantityField}/>
          <Button
            onClick={(event) => {
              props.handleBuy(stockId,
                              stockName,
                              pricePerShare,
                              parseInt(quantity),
                              event)}}
            variant="contained"
            color="primary"
            className={classes.buyButton}>Buy</Button>
      </ListItem>
  )}

  return (
    <>
      <Container>
        <Box my={4}>
          <h1>Buying</h1>
        </Box>
        <List >
          {stockList}
        </List>
      </Container>
    </>
  );
}
