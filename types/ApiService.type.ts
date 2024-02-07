export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	id: string;
	username: string;
}

export interface ErrorResponse {
	message: string;
}

export interface newCategoryResponse {
	answer: string;
}

export interface SuccesRegistration {
	ok: true;
	dto: AuthResponse;
}

export interface notSuccesRegistration {
	ok: false;
	message: string;
}

export interface SuccesUpload {
	ok: true;
	url: string;
}

export interface SuccesNewCategory {
	ok: true;
	categoryId: string;
}

export interface SuccesNewPost {
	ok: true;
	postId: string;
}

interface Category {
	name: string;
	image: string;
	categoryType: number;
	user: string;
	_id: string;
}

interface Post {
	name: string;
	images: string[];
	audio: string;
	text: string;
	category: string;
	user: string;
	_id: string;
}
export interface succesGetCategories {
	ok: true;
	categories: Category[];
}

export interface succesGetPosts {
	ok: true;
	posts: Post[];
}

export interface succesGettingAudio {
	ok: true;
	audio: HTMLAudioElement;
}
