export function createRegion(regionName:string, token:string) {
  
	return fetch('http://127.0.0.1:3000/api/regiones/createRegion', {
	  method: 'POST',
	  headers: {
		'Authorization': 'Bearer ' + token,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({regionName})
	})
	  .then(response => {
		if (!response.ok) {
		  throw new Error(response.statusText);
		}
		return response.json();
	  });
  }