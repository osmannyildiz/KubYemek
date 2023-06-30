import { app } from "@/app";
import { CONFIG } from "@/config";

app.listen(CONFIG.PORT, () =>
	console.log(`Auth API is listening on :${CONFIG.PORT}`)
);
