import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import AddCar from './AddCar'
import EditCar  from "./EditCar";

export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch ('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }
    const rowData = cars.map((cars) => ({
        Brand: cars.brand,
        Model: cars.model,
        Color: cars.color,
        Fuel: cars.fuel,
        Year: cars.year,
        Price: cars.price,
        Delete: cars._links.self.href}));

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')){
        handleClick();
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        }
    };

    const saveCar = (car) => {
        if (window.confirm('Add this new car?')){
        handleClick();
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        }
    };

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))        
    };

    //Snackbar config

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
        });
    
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const columnss = [
        {headerName: 'Brand', resizable: true, field: 'Brand', sortable:true, filter:true, floatingFilter:true, width:180}
        ,{headerName: 'Model', resizable: true, field: 'Model', sortable:true, filter:true, floatingFilter:true, width:180}
        ,{headerName: 'Color', resizable: true, field: 'Color', sortable:true, filter:true, floatingFilter:true, width:100}
        ,{headerName: 'Fuel', resizable: true, field: 'Fuel', sortable:true, filter:true, floatingFilter:true, width:80}
        ,{headerName: 'Year', resizable: true, field: 'Year', sortable:true, filter:true, floatingFilter:true, width:100}
        ,{headerName: 'Price', resizable: true, field: 'Price', sortable:true, filter:true, floatingFilter:true, width:120}
        ,{headerName: 'Edit', width: 120, 
        cellRendererFramework: function(params) {
            return <EditCar updateCar={updateCar} car={params.data}/>
        },}
        ,{headerName: 'Delete', resizable: true, field: 'Delete', width:120, 
        cellRendererFramework: function(params) {
            return <Button size="small" variant="outlined" color="error" onClick={() =>deleteCar(params.data.Delete)}> Delete </Button>
        },}
    ];

   return (
       <div className="ag-theme-alpine" style={{height: 800, width: "max"}}>
           <AddCar saveCar={saveCar}/> 
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Rivi poistettu onnistuneesti!
        </Alert>
      </Snackbar>
           <AgGridReact
               rowData={rowData}
               animateRows={true}
               columnDefs={columnss}>
           </AgGridReact>
       </div>
   );
};
