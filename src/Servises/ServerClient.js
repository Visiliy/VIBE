class ServerClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getRequest(endpoint, params) {
        try {
            const url = new URL(`${this.baseUrl}${endpoint}`, this.baseUrl);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return { message: data };
            } else {
                const errorText = await response.text();
                return { message: `HTTP ${response.status}: ${errorText}` };
            }
        } catch (error) {
            return { message: `Error: ${error.message}` };
        }
    }

    async postRequest(endpoint, data) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                return { message: result };
            } else {
                const errorText = await response.text();
                return { message: `HTTP ${response.status}: ${errorText}` };
            }
        } catch (error) {
            return { message: `Error: ${error.message}` };
        }
    }
}

export default ServerClient;