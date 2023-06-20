import { app } from "./src/app";
import { CONFIG } from "./src/config";

app.listen(CONFIG.PORT, () => console.log(`Listening on :${CONFIG.PORT}`));
