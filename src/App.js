import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './Components/Formulario';
import axios from 'axios';

function App() {
  // definir el state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');

  useEffect(() => {
    if(Object.keys(busquedaLetra).length===0)return;
    const consultarApi = async () => {
      const {artista, cancion} = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const resultado= await axios.get(url);
      console.log(resultado);
    }
    consultarApi();
  }, [busquedaLetra])

  return (
    <Fragment>
      <Formulario 
      guardarBusquedaLetra={guardarBusquedaLetra}
      />
    </Fragment>
  );
}

export default App;
