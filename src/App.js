import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './Components/Formulario';
import axios from 'axios';
import Cancion from './Components/Cancion';
import Info from './Components/Info';

function App() {
  // definir el state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const[info, guardarInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;
    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const url1 = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`
      // Para que el fetch de las 2 apis inicien simultaneamente sin esperar a la otra.
      const [letra, informacion] = await Promise.all([
        axios.get(url1),
        axios.get(url2)
      ])
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0])
    }
    consultarApiLetra();
  }, [busquedaLetra, info])

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
          <Info 
          info={info}
          />
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
