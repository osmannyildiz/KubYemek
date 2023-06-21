import { app } from "./src/app";
import { CONFIG } from "./src/config";

app.listen(CONFIG.PORT, () =>
	console.log(`Admin API is listening on :${CONFIG.PORT}`)
);
