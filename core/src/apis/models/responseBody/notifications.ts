import { ApiGetEntitiesResponseBody } from "@core/apis/models/responseBody";
import { AdminNotification } from "@core/common/models/entity/frontend";

export type ApiGetNotificationsResponseBody =
	ApiGetEntitiesResponseBody<AdminNotification>;
