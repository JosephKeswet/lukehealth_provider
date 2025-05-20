class TokenService {
	private accessToken: string | null = null;
	private refreshToken: string | null = null;

	getToken() {
		return this.accessToken;
	}

	setToken(newToken: string | null) {
		this.accessToken = newToken;
	}

	getRefreshToken() {
		return this.refreshToken;
	}

	setRefreshToken(newRefreshToken: string | null) {
		this.refreshToken = newRefreshToken;
	}
}

export const tokenService = new TokenService();
