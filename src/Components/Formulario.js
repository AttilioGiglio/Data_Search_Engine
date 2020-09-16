import React, {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({guardarBusquedaLetra}) => {

    const [busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion:''
    })
    const [error, guardarError] = useState(false);

    const {artista, cancion} = busqueda;

// Funcion a cada input para leer su contenido
    const actualizarState = (e) => {
        guardarBusqueda({...busqueda,[e.target.name]: e.target.value})
    } 

// consultar las apis
    const buscarInformacion = (e) => {
        e.preventDefault();
        if(artista.trim()===''||cancion.trim()===''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarBusquedaLetra(busqueda);
    }     

    return (
        <div className='bg-info'>
            {error ? <Error mensaje='Favor completar los campos de nombres de artista y cancion' /> : null}
            <div className='container'>
                <div className='row'>
                    <form onSubmit={buscarInformacion} className='col card text-white bg-transparent mb-5 pt-5 pb-2'>
                        <fieldset>
                            <legend className='text-center'>
                                Song Lyrics Search Engine
                            </legend>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='mr-2'>Artist:</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='artista'
                                            placeholder='Artist name'
                                            onChange={actualizarState}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='mr-2'>Song:</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='cancion'
                                            placeholder='Song name'
                                            onChange={actualizarState}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary float-right'
                            >
                                Buscar
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario
