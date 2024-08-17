import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/home/Home';
import MenuAppBar from './pages/home/MenuAppBar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import { useState } from 'react';
import ProductDetails from './pages/home/ProductDetails';

function App() {
  const [mode, setmode] = useState('dark');
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MenuAppBar mode={mode} setmode={setmode} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
