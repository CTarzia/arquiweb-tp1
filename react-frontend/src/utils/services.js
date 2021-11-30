
async function apiGet (url = "", successCallback, failureCallback) {
	const response = await fetch(`https://ver-la-carta.herokuapp.com/${url}`)
		.then((res) => res.json())

		.then((json) => {
			if (json.status === 404) {
				if (failureCallback) failureCallback();
			} else {
				if (successCallback) successCallback(json);
				return json;
			}
		});
	return response;
};

const apiPost = (url = "", data = {}, successCallback, failureCallback) => {
	fetch(`https://ver-la-carta.herokuapp.com/${url}`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json)
		.then((json) => {
			if (json.status === 404) {
				if (failureCallback) failureCallback();
			} else {
				if (successCallback) successCallback(json);
			}
		});
};
