import api from '../http/index';
import {
	AuthResponse,
	ErrorResponse,
	SuccesRegistration,
	notSuccesRegistration,
	SuccesUpload,
	SuccesNewCategory,
	newCategoryResponse,
	SuccesNewPost,
	succesGetCategories,
	succesGetPosts,
	succesGettingAudio
} from '../types/ApiService.type';

class ApiService {
	static isSucces(obj: any): obj is AuthResponse {
		return 'id' in obj && 'accessToken' in obj;
	}

	static async registration(
		email: string,
		password: string,
		username: string
	): Promise<SuccesRegistration | notSuccesRegistration> {
		try {
			let res = await api.post<AuthResponse | ErrorResponse>('/registration', {
				email,
				password,
				username
			});
			if (ApiService.isSucces(res.data)) {
				localStorage.setItem('token', res.data.accessToken);
				return {
					ok: true,
					dto: res.data
				};
			} else {
				return {
					ok: false,
					message: res.data.message
				};
			}
		} catch (error) {
			throw new Error();
		}
	}

	static async login(email: string, password: string): Promise<SuccesRegistration | notSuccesRegistration> {
		try {
			let res = await api.post<AuthResponse | ErrorResponse>('/login', {
				email,
				password
			});
			if (ApiService.isSucces(res.data)) {
				localStorage.setItem('token', res.data.accessToken);
				return {
					ok: true,
					dto: res.data
				};
			} else {
				return {
					ok: false,
					message: res.data.message
				};
			}
		} catch (error) {
			throw new Error();
		}
	}

	static async logout(): Promise<void> {
		try {
			await api.post('/logout');
		} catch (error) {
			throw new Error();
		}
	}

	static async test(): Promise<void> {
		console.log(await api.get('/test'));
	}

	static async upload(file: File): Promise<SuccesUpload | notSuccesRegistration> {
		const formData = new FormData();
		formData.append('file', file);
		try {
			let res = await api.post('/upload', formData);
			return { ok: true, url: res.data };
		} catch (error) {
			return { ok: false, message: 'some problems with uploading' };
		}
	}

	static async createNewCategory(
		singleImage: File,
		multipleImages: File[],
		categoryName: string,
		postName: string,
		postText: string,
		categoryType: number,
		base64?: string
	): Promise<SuccesNewCategory | notSuccesRegistration> {
		const formData = new FormData();
		formData.append('singleImage', singleImage);
		multipleImages.forEach((image) => {
			formData.append('multipleImages', image);
		});
		formData.append('categoryName', categoryName);
		formData.append('postName', postName);
		formData.append('postText', postText);
		formData.append('categoryType', categoryType.toString());
		if (base64) {
			formData.append('base64', base64);
		}

		try {
			let res = await api.post<ErrorResponse | newCategoryResponse>('/createNewCategory', formData);
			if ('message' in res.data) {
				return { ok: false, message: res.data.message };
			} else {
				return { ok: true, categoryId: res.data.answer };
			}
		} catch (error) {
			console.log(error);
			return { ok: false, message: 'some problems with posting' };
		}
	}
	static async createNewPost(
		multipleImages: File[],
		categoryId: string,
		postName: string,
		postText: string,
		base64?: string
	): Promise<SuccesNewPost | notSuccesRegistration> {
		const formData = new FormData();

		multipleImages.forEach((image) => {
			formData.append('multipleImages', image);
		});
		formData.append('categoryId', categoryId);
		formData.append('postName', postName);
		formData.append('postText', postText);
		if (base64) {
			formData.append('base64', base64);
		}

		try {
			let res = await api.post<ErrorResponse | newCategoryResponse>('/createNewPost', formData);
			if ('message' in res.data) {
				return { ok: false, message: res.data.message };
			} else {
				return { ok: true, postId: res.data.answer };
			}
		} catch (error) {
			console.log(error);
			return { ok: false, message: 'some problems with posting' };
		}
	}

	static async getCategories(): Promise<succesGetCategories | notSuccesRegistration> {
		try {
			let res = await api.get('/getCategories');
			if ('message' in res.data) {
				return { ok: false, message: res.data.message };
			} else {
				return { ok: true, categories: res.data };
			}
		} catch (error) {
			console.log(error);
			return { ok: false, message: 'error with getting categories' };
		}
	}

	static async getPosts(categoryId: string): Promise<succesGetPosts | notSuccesRegistration> {
		try {
			let res = await api.get(`/getPosts/${categoryId}`);
			if ('message' in res.data) {
				return { ok: false, message: res.data.message };
			} else {
				return { ok: true, posts: res.data };
			}
		} catch (error) {
			console.log(error);
			return { ok: false, message: 'error with getting posts' };
		}
	}

	static async getAudio(audioId: string): Promise<succesGettingAudio | notSuccesRegistration> {
		try {
			let res = await api.get(`/getAudio/${audioId}`, { responseType: 'arraybuffer' });
			console.log(res);
			if ('message' in res.data) {
				return { ok: false, message: res.data.message };
			} else {
				const audioBlob = new Blob([res.data], { type: 'audio/mp3' });
				const audioUrl = URL.createObjectURL(audioBlob);
				const audio = new Audio(audioUrl);

				return { audio, ok: true };
			}
		} catch (error) {
			console.log(error);
			return { ok: false, message: 'error with getting audio' };
		}
	}
}

export default ApiService;
