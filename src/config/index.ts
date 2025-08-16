import "dotenv/config";

interface Config {
	port: number | string;
	mongoURI: string;
	jwtAccessTokenSecret: string;
	jwtAccessTokenExpiry: string;
	jwtRefreshTokenSecret: string;
	jwtRefreshTokenExpiry: string;
}

const config: Config = {
	port: process.env.PORT || 3000,
	mongoURI: process.env.MONGO_URI!,
	jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_EXPIRY!,
	jwtAccessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY!,
	jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET!,
	jwtRefreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY!,
};

export default config;
