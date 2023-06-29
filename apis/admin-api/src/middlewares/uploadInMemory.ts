import multer from "multer";

export const uploadInMemory = multer({
	storage: multer.memoryStorage(),
});
