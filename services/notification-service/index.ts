import { app } from "@/app";
import { CONFIG } from "@/config";
import { getEnv } from "@core/common/utils";

app.listen(CONFIG.PORT, () =>
	console.log(
		`Notification Service (env: ${getEnv()}) is listening on :${CONFIG.PORT}`
	)
);
