import { app } from "@/app";
import { CONFIG } from "@/config";

app.listen(CONFIG.PORT, () =>
	console.log(`Admin Service is listening on :${CONFIG.PORT}`)
);
