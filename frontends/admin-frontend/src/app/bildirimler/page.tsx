"use client";

import AppPage from "@/components/layout/AppPage";
import { useAuthContext } from "@/contexts/AuthContext";
import { getNotifications } from "@/query/fetchers/notifications";
import { AdminApiClient } from "@core/frontends/apiClients";
import {
	mdiAlertCircleOutline,
	mdiCheckCircleOutline,
	mdiInformationOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";

export default function NotificationsPage() {
	const { token } = useAuthContext();
	const adminApiClient = new AdminApiClient(token);
	const notificationsQuery = useQuery("notifications", () =>
		getNotifications(adminApiClient)
	);

	return (
		<AppPage title="Bildirimler">
			<ListGroup>
				{notificationsQuery.isSuccess && notificationsQuery.data
					? notificationsQuery.data.map((notification) => (
							<ListGroup.Item
								key={notification.id}
								variant={notification.kind}
								className="d-flex"
							>
								<Icon
									path={
										{
											info: mdiInformationOutline,
											success: mdiCheckCircleOutline,
											warning: mdiAlertCircleOutline,
										}[notification.kind]
									}
									size={2}
									className="me-3"
								/>
								<div>
									<h5 className="mb-1">{notification.title}</h5>
									<p className="mb-2">{notification.description}</p>
									<small className="text-muted">
										{new Date(notification.createdAt).toLocaleString()}
									</small>
								</div>
							</ListGroup.Item>
					  ))
					: undefined}
			</ListGroup>
		</AppPage>
	);
}
