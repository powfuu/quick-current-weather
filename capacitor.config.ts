import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "ev.current.weather",
	appName: "ev.current.weather",
	webDir: "dist",
	server: {
		androidScheme: "https"
	}
};

export default config;
