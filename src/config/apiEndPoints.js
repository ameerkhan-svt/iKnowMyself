const apiDomain = process.env.REACT_APP_BASE_URL || 'http://localhost:1337';

const basePaths = {
    login: `${apiDomain}/api/v1/auth/login`,
    signIn: `${apiDomain}/api/v1/auth/signup`,
}

export const APIS = {
    login: basePaths.login,
    signIn: basePaths.signIn,
}