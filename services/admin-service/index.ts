import { app } from "./src/app";
import { CONFIG } from "./src/config";

app.listen(CONFIG.PORT, () =>
	console.log(`Admin Service is listening on :${CONFIG.PORT}`)
);
