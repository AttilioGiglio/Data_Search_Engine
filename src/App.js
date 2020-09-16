import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './Components/Formulario';
import axios from 'axios';
import Cancion from './Components/Cancion'

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
     guardarLetra(resultado.data.lyrics);
    }
    consultarApi();
  }, [busquedaLetra])

  return (
    <Fragment>
      <Formulario 
      guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>

          </div>
          <div className='col-md-6'>
            <Cancion 
            letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
