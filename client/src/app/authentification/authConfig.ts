interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'LSKVdu6NVLbvMVVtKITPBZ7M7Adxhmna',
    CLIENT_DOMAIN: 'revise-pas-seul-poly.auth0.com',
    AUDIENCE: 'http://localhost:3001',
    REDIRECT: 'http://localhost:4200/callback',
    SCOPE: 'openid profile email'
};
