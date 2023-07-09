"use client";

import EntityFormModal from "@/components/form/EntityFormModal";
import AppPage from "@/components/layout/AppPage";
import { CONFIG } from "@/config";
import { useAuthContext } from "@/contexts/AuthContext";
import { getOrders } from "@/query/fetchers/orders";
import { cancelOrder } from "@/query/mutations/orders";
import { IOrderDto } from "@core/common/models/entity/dto/OrderDto";
import { OrderStatus } from "@core/common/models/entity/enums";
import { ErrorType } from "@core/common/models/errors";
import { AdminApiClient } from "@core/frontends/apiClients";
import { orderStatuses } from "@core/frontends/constants/strings";
import { formatPriceForDisplay, getErrMsg } from "@core/frontends/utils";
import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function OrdersPage() {
	const { token } = useAuthContext();
	const adminApiClient = new AdminApiClient(token);
	const queryClient = useQueryClient();
	const ordersQuery = useQuery("orders", () => getOrders(adminApiClient));
	const cancelOrderMutation = useMutation("cancelOrder", cancelOrder);

	const [orderToCancel, setOrderToCancel] = useState<IOrderDto>();
	const [orderCancelFormError, setOrderCancelFormError] = useState<string>();

	const handleOrderCancelModalConfirm = async () => {
		if (!orderToCancel) return;

		try {
			await cancelOrderMutation.mutateAsync({
				adminApiClient,
				id: orderToCancel.id,
			});
		} catch (error: any) {
			console.error(error);
			setOrderCancelFormError(
				error?.respBody?.message || getErrMsg(ErrorType.default)
			);
			return;
		}

		queryClient.invalidateQueries("orders");
		closeOrderCancelModal();
	};

	const closeOrderCancelModal = () => {
		setOrderToCancel(undefined);
		setOrderCancelFormError(undefined);
	};

	return (
		<AppPage title="Siparişler">
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope="col">Sipariş Kodu</th>
						<th scope="col">Müşteri</th>
						<th scope="col">Ürünler</th>
						<th scope="col">Toplam Fiyat</th>
						<th scope="col">Durum</th>
						<th scope="col" style={{ width: "200px" }}>
							İşlemler
						</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{ordersQuery.isSuccess && ordersQuery.data
						? ordersQuery.data.map((order) => (
								<tr key={order.id}>
									<td>{order.code}</td>
									<td>
										{order.customer.name} {order.customer.surname}
									</td>
									<td>
										<ul className="m-0 p-0">
											{order.products.map((orderProduct) => (
												<li key={orderProduct.product.id}>
													{orderProduct.product.name} x {orderProduct.unitCount}
												</li>
											))}
										</ul>
									</td>
									<td>
										{formatPriceForDisplay(
											order.products.reduce(
												(acc, orderProduct) =>
													acc +
													orderProduct.product.price * orderProduct.unitCount,
												0
											)
										)}
									</td>
									<td>{orderStatuses[order.status][CONFIG.LANG_ID]}</td>
									<td>
										<Stack direction="horizontal" gap={2}>
											<Button
												variant="danger"
												size="sm"
												disabled={[
													OrderStatus.canceledByCustomer,
													OrderStatus.canceledByAdmin,
												].includes(order.status)}
												onClick={() => setOrderToCancel(order)}
											>
												İptal Et
											</Button>
										</Stack>
									</td>
								</tr>
						  ))
						: undefined}
				</tbody>
			</table>

			<EntityFormModal
				show={!!orderToCancel}
				title="Siparişi İptal Et"
				error={orderCancelFormError}
				mutation={cancelOrderMutation}
				confirmButtonVariant="danger"
				confirmButtonText="İptal Et"
				onSubmit={handleOrderCancelModalConfirm}
				onCancel={closeOrderCancelModal}
			>
				<p>
					<em>
						{orderToCancel?.customer.name} {orderToCancel?.customer.surname}
					</em>{" "}
					adlı müşteriye ait <em>{orderToCancel?.code}</em> kodlu siparişi iptal
					etmek istediğinize emin misiniz?
				</p>
			</EntityFormModal>
		</AppPage>
	);
}
