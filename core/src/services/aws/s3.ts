import { S3Client } from "@aws-sdk/client-s3";
import { CONFIG } from "@core/services/config";

export const s3Client = new S3Client({
	credentials: {
		accessKeyId: CONFIG.AWS_ACCESS_KEY_ID,
		secretAccessKey: CONFIG.AWS_SECRET_ACCESS_KEY,
	},
	region: CONFIG.AWS_REGION,
});
