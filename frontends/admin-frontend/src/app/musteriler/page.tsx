"use client";

import EntityFormModal from "@/components/form/EntityFormModal";
import AppPage from "@/components/layout/AppPage";
import { useAuthContext } from "@/contexts/AuthContext";
import { getCustomers } from "@/query/fetchers/customers";
import { addToCustomerPoints } from "@/query/mutations/customers";
import { Customer } from "@core/common/models/entity/frontend";
import { ErrorType } from "@core/common/models/errors";
import { AdminApiClient } from "@core/frontends/apiClients";
import { getErrMsg } from "@core/frontends/utils";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function CustomersPage() {
	const { token } = useAuthContext();
	const adminApiClient = new AdminApiClient(token);
	const queryClient = useQueryClient();
	const customersQuery = useQuery("customers", () =>
		getCustomers(adminApiClient)
	);
	const addToCustomerPointsMutation = useMutation(
		"addToCustomerPoints",
		addToCustomerPoints
	);

	const [customerToAddPoints, setCustomerToAddPoints] = useState<Customer>();
	const [customerAddPointsFormError, setCustomerAddPointsFormError] =
		useState<string>();

	const handleCustomerAddPointsFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		if (!customerToAddPoints) return;

		const formData = new FormData(event.target as HTMLFormElement);
		const points = formData.get("points")?.toString();

		if (!points) {
			// TODO This also runs when +points === 0
			setCustomerAddPointsFormError(getErrMsg(ErrorType.requiredFieldEmpty));
			return;
		}

		// if (+points === 0) {
		// 	setCustomerAddPointsFormError(getErrMsg(ErrorType.default));
		// 	return;
		// }

		try {
			await addToCustomerPointsMutation.mutateAsync({
				adminApiClient,
				id: customerToAddPoints.id,
				data: {
					points: +points,
				},
			});
		} catch (error: any) {
			console.error(error);
			setCustomerAddPointsFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("customers");
		closeCustomerAddPointsModal();
	};

	const closeCustomerAddPointsModal = () => {
		setCustomerToAddPoints(undefined);
		setCustomerAddPointsFormError(undefined);
	};

	return (
		<AppPage title="Müşteriler">
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope="col">E-posta</th>
						<th scope="col">Ad Soyad</th>
						<th scope="col">Puan</th>
						<th scope="col" style={{ width: "200px" }}>
							İşlemler
						</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{customersQuery.isSuccess && customersQuery.data
						? customersQuery.data.map((customer) => (
								<tr key={customer.id}>
									<td>{customer.email}</td>
									<td>
										{customer.name} {customer.surname}
									</td>
									<td>{customer.points}</td>
									<td>
										<Stack direction="horizontal" gap={2}>
											<Button
												variant="success"
												size="sm"
												onClick={() => setCustomerToAddPoints(customer)}
											>
												Puan Arttır/Azalt
											</Button>
										</Stack>
									</td>
								</tr>
						  ))
						: undefined}
				</tbody>
			</table>

			<EntityFormModal
				show={!!customerToAddPoints}
				title="Müşterinin Puanını Arttır/Azalt"
				error={customerAddPointsFormError}
				mutation={addToCustomerPointsMutation}
				confirmButtonVariant="success"
				confirmButtonText="Arttır/Azalt"
				onSubmit={handleCustomerAddPointsFormSubmit}
				onCancel={closeCustomerAddPointsModal}
			>
				<p>
					<em>
						{customerToAddPoints?.name} {customerToAddPoints?.surname}
					</em>{" "}
					adlı müşteriye kaç puan eklemek istersiniz? Puan eksiltmek için
					negatif sayı giriniz.
				</p>

				<Form.Group controlId="points">
					<Form.Control type="number" name="points" defaultValue={0} required />
					<Form.Label>
						<em>puan</em>
					</Form.Label>
				</Form.Group>
			</EntityFormModal>
		</AppPage>
	);
}
