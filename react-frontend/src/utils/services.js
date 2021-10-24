const apiGet = (url = "", successCallback, failureCallback) => {
	fetch(`http://localhost:8080/${url}`)
		.then((res) => res.json())
		.then((json) => {
			if (json.status === 404) {
				if (failureCallback) failureCallback();
			} else {
				if (successCallback) successCallback(json);
			}
		});
};

const apiPost = (url = "", data = {}, successCallback, failureCallback) => {
	fetch(`http://localhost:8080/${url}`, {
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
