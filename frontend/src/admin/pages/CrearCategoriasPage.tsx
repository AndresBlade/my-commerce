import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { getCategories } from "../../categories/helpers/getCategories";
import { createCategory } from "../../categories/helpers/createCategories";
import { updateCategory } from "../../categories/helpers/updateCategories";

export const CrearCategoriasPage = () => {
	const {
		user: { token },
	} = useContext(AuthContext);

  const categoryName = 'Biblioteca';
  
  createCategory(categoryName, token)
    .then(data => {
      console.log('Categoría creada con éxito:', data);
    })
    .catch(error => {
      console.error('Hubo un error al crear la categoría:', error);
    });

  return (
    <div>

    </div>
  );
};
