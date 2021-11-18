import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
      brand: '', model: '', color: '', fuel: '', year: '', price: ''
  });

  //new Comment
  const handleClickOpen = () => {
    setCar({brand: props.car.Brand, model: props.car.Model, 
    color: props.car.Color, fuel: props.car.Fuel,
    year: props.car.Year, price: props.car.Price})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const updateCar =  () => {
      props.updateCar(car, props.car.Delete);
      handleClose();
  }

  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        Edit Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose what to edit
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            value={car.brand}
            label="Brand"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="model"
            value={car.model}
            label="Model"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="color"
            value={car.color}
            label="Color"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="year"
            value={car.year}
            label="Year"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            label="Fuel"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="price"
            value={car.price}
            label="Price"
            fullWidth
            onChange={e => handleInputChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCar}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
