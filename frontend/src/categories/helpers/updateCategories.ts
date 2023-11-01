export function updateCategory(categoryName:string, categoriaID:number, token:string) {
	
	return fetch(`http://127.0.0.1:3000/api/categorias/editCategory/${categoriaID}`, {
		method: 'PUT',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({categoryName, categoriaID}),
	}).then(response => {
		console.log(response);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	  });
}
