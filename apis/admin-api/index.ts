import { app } from "@/app";
import { CONFIG } from "@/config";

app.listen(CONFIG.PORT, () =>
	console.log(`Admin API is listening on :${CONFIG.PORT}`)
);
