class AuthorizationService {
    constructor() {
        this.baseURL = 'https://api.example.com/auth';
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Login failed');
            }

            return data;
        } catch (error) {
            throw new Error(error.message || 'Login request failed');
        }
    }

    async register(username, email, password) {
        try {
            const response = await fetch(`${this.baseURL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Registration failed');
            }

            return data;
        } catch (error) {
            throw new Error(error.message || 'Registration request failed');
        }
    }
}

export default new AuthorizationService();
