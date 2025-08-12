import "dotenv/config";

interface Config {
	port: number | string;
	mongoURI: string;
}

const config: Config = {
	port: process.env.PORT || 3000,
	mongoURI: process.env.MONGO_URI!,
};

export default config;
