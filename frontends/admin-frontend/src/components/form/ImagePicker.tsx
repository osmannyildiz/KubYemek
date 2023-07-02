"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Stack } from "react-bootstrap";

interface Props {
	name: string;
	defaultImageUrl?: string;
}

export default function ImagePicker({ name, defaultImageUrl }: Props) {
	const [imageFile, setImageFile] = useState<Blob | undefined>();
	const [previewUrl, setPreviewUrl] = useState<string | undefined>(
		defaultImageUrl
	);
	const filePickerRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!imageFile) {
			setPreviewUrl(defaultImageUrl);
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result as string);
		};
		fileReader.readAsDataURL(imageFile);
	}, [imageFile, defaultImageUrl]);

	const handlePick: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		if (event.target.files && event.target.files.length === 1) {
			setImageFile(event.target.files[0]);
		}
	};

	return (
		<div>
			<input
				type="file"
				accept=".jpg,.jpeg,.png"
				name={name}
				style={{ display: "none" }}
				ref={filePickerRef}
				onChange={handlePick}
			/>

			<div className="border p-2 text-center">
				<div>
					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Preview"
							className="mb-2"
							style={{
								width: "100%",
								maxHeight: "400px",
								objectFit: "contain",
							}}
						/>
					) : (
						<p>Resim seçilmedi.</p>
					)}
				</div>

				<Stack
					direction="horizontal"
					gap={2}
					className="justify-content-center"
				>
					<Button
						type="button"
						variant="primary"
						onClick={() => filePickerRef.current?.click()}
					>
						Resim Seç
					</Button>
				</Stack>
			</div>
		</div>
	);
}
