interface CategoryUpdatedProps {
	categoryUpdated: { id: number; nombre: string};
}

export const updateCategory = (
	token: string,
	body: { newCategoryName: string }
): Promise<CategoryUpdatedProps> =>
	fetch(`http://127.0.0.1:3000/api/categorias/editCategory/5`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		console.log(response);
		if (!response.ok) {
			return response.text().then(err => {
				throw new Error(err);
			});
		}
		return response.json() as Promise<CategoryUpdatedProps>;
	});
