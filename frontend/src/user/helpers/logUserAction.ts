import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export async function logUserAction(action: string) {
    const {
		user: {
			specificData: { nombre, id },
		},
	} = useContext(AuthContext);
 
    const url = 'http://127.0.0.1:3000/api/bitacora/createLog';

    const data = {
      action,
      username: nombre,
      userId: id,
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const responseData = await response.json();
      console.log('Solicitud exitosa:', responseData);
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  