import { S3Client } from "@aws-sdk/client-s3";
import { CORE_SERVICES_CONFIG } from "@core/services/config";

export const s3Client = new S3Client({
	credentials: {
		accessKeyId: CORE_SERVICES_CONFIG.AWS_ACCESS_KEY_ID,
		secretAccessKey: CORE_SERVICES_CONFIG.AWS_SECRET_ACCESS_KEY,
	},
	region: CORE_SERVICES_CONFIG.AWS_REGION,
});
