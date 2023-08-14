import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const PaginaError = () => {
	const error = useRouteError();

	console.log(error);

	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>La página a la que intentas acceder no existe 😥</h1>
				<p>Contacta con MyCommerce para más información</p>
				<p>Error description: {error.statusText}</p>
				<p>Error code: {error.status}</p>
			</>
		);
	} else {
		return <h2>Ha ocurrido un error inesperado, vuelva a intentarlo</h2>;
	}
};
