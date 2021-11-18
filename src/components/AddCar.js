import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
      brand: '', model: '', color: '', fuel: '', year: '', price: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const addCar =  () => {
      props.saveCar(car);
      handleClose();
  }

  return (
    <div>
      <Button style={{margin:10}}variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a car fill in all information.
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
          <Button onClick={addCar}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
