import { useState } from 'react';
import Alert from './Alert';
import { formatDate } from '../utils/formatDate';

const Form = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [discharge_date, setDischarge_date] = useState(formatDate(Date.now()));
  const [symptoms, setSymptoms] = useState('');

  const [isDisabled, setIsDisabled] = useState(false);

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    if (
      [
        name.trim(),
        owner.trim(),
        email.trim(),
        discharge_date.trim(),
        symptoms.trim(),
      ].includes('')
    ) {
      console.log(discharge_date);
      setAlert({ message: 'Todos los campos son obligatorios', error: true });
      setIsDisabled(false);
    }
  };

  return (
    <>
      <p className='text-lg text-center mb-10'>
        Añade tus pacientes y{' '}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form
        //
        className='bg-white py-10 px-5 mb-5 shadow-md rounded-md'
        onSubmit={handleSubmit}
      >
        {/* Pet name */}
        <div className='mb-5'>
          <label
            //
            htmlFor='name'
            className='text-gray-700 uppercase font-bold'
          >
            Nombre Mascota
          </label>
          <input
            type='text'
            id='name'
            placeholder='Nombre de la Mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Owner name */}
        <div className='mb-5'>
          <label
            //
            htmlFor='owner'
            className='text-gray-700 uppercase font-bold'
          >
            Nombre Propietario
          </label>
          <input
            type='text'
            id='owner'
            placeholder='Nombre del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        {/* Owner email */}
        <div className='mb-5'>
          <label
            //
            htmlFor='email'
            className='text-gray-700 uppercase font-bold'
          >
            Email Propietario
          </label>
          <input
            type='email'
            id='email'
            placeholder='Email del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Discharge Date: Fecha de alta */}
        <div className='mb-5'>
          <label
            //
            htmlFor='discharge_date'
            className='text-gray-700 uppercase font-bold'
          >
            Fecha de Alta
          </label>
          <input
            type='date'
            id='discharge_date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={formatDate(discharge_date)}
            onChange={(e) => setDischarge_date(e.target.value)}
          />
        </div>

        {/* Pet Symptoms */}
        <div className='mb-5'>
          <label
            //
            htmlFor='symptoms'
            className='text-gray-700 uppercase font-bold'
          >
            Síntomas
          </label>
          <textarea
            id='symptoms'
            placeholder='Describe los síntomas de la mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          disabled={isDisabled}
          type='submit'
          value='Agregar Paciente'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
        />
      </form>

      {alert.message ? <Alert alert={alert} /> : null}
    </>
  );
};

export default Form;
