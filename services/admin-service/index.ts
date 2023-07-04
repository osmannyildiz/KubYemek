import { app } from "@/app";
import { CONFIG } from "@/config";
import { getEnv } from "@core/common/utils";

app.listen(CONFIG.PORT, () =>
	console.log(
		`Admin Service (env: ${getEnv()}) is listening on :${CONFIG.PORT}`
	)
);
