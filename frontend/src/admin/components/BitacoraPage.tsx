import { useEffect, useState, useContext } from 'react';
import { getAllUserLogFiles } from '../../admin/helpers/getAllUserLogs';
import { AuthContext } from '../../auth/context/AuthContext';

export const Bitacora = () => {
    const [bitacoraData, setBitacoraData] = useState<string[] | null>(null);

    const {
        user: { token },
    } = useContext(AuthContext);

    useEffect(() => {
        getAllUserLogFiles(token)
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));
    }, [token]);

    return (
        <div>
            <h1>Bitácora de Actividades</h1>
            <ul>
                {bitacoraData?.map((registro, index) => (
                    <li key={index}>{registro}</li>
                ))}
            </ul>
        </div>
    );
};
