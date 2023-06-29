import { mimetypes } from "@core/common/constants/mimetypes";
import { s3Client } from "@core/services/aws/s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";

export const uploadProductImageToS3 = multer({
	storage: multerS3({
		s3: s3Client,
		bucket: "kubyemek-bucket-public",
		acl: "public-read",
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: function (req, file, cb) {
			const fileExtension =
				mimetypes.find((mt) => mt.mimetype === file.mimetype)?.fileExtension ||
				"bin";
			cb(null, `product-images/${uuidv4()}.${fileExtension}`);
		},
	}),
});
