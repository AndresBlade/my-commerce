export function createCategory(categoryName:string, token:string) {
  
	return fetch('http://127.0.0.1:3000/api/categorias/createCategory', {
	  method: 'POST',
	  headers: {
		'Authorization': 'Bearer ' + token,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({categoryName})
	})
	  .then(response => {
		if (!response.ok) {
		  throw new Error(response.statusText);
		}
		return response.json();
	  });
  }
  