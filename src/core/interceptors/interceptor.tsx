async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const errorResponse = await response.json();
		throw new Error(
			errorResponse.message || "Se ha producido un error inesperado"
		);
	}
	return response.json();
}

export async function fetchApi<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	try {
		const response = await fetch(url, options);
		return await handleResponse<T>(response);
	} catch (e) {
		throw new Error((e as Error).message);
	}
}
