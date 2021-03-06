import auth from '../../services/auth';

const imageApi = {
	url: 'NO_URL',
	
	uploadImage(token, image) {
		let formData = new FormData();
		formData.append('image', image);

		return fetch(`${this.url}/image`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
			},
			body: formData,
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw new Error(response.error);

				return response;
			});
	},
};

export default imageApi;
