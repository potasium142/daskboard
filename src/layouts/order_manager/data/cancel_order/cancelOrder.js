import { useState, useEffect } from "react";
import OrderService from "api/OrderService";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";

export default function cancelOrder(pageCancelOrder, rowsPerPageCancelOrder) {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const jwtToken = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!jwtToken) return;
      try {
        const response = await OrderService.getAllOrderOnConfirm(
          "CANCELLED",
          pageCancelOrder,
          rowsPerPageCancelOrder
        );
        if (Array.isArray(response.content)) {
          const sortedOrders = response.content.sort(
            (a, b) => new Date(b.order_date) - new Date(a.order_date)
          );

          setOrders(sortedOrders);
          setTotalPages(response.total_page || 1);
        } else {
          setOrders([]);
          setTotalPages(1);
        }
      } catch (error) {
        setOrders([]);
        setTotalPages(1);
      }
    };
    fetchOrders();
  }, [jwtToken, pageCancelOrder, rowsPerPageCancelOrder]);

  const hasNextPageCancel = pageCancelOrder < totalPages;

  const columns = [
    { Header: "Receiver", accessor: "name", align: "left" },
    { Header: "Address", accessor: "address", align: "left" },
    { Header: "Order Date", accessor: "order_date", align: "left" },
    { Header: "Phone", accessor: "phone", align: "left" },
    { Header: "Total Price", accessor: "total_price", align: "left" },
    { Header: "Coupon", accessor: "coupon", align: "center" },
    { Header: "Status", accessor: "status", align: "left" },
    { Header: "Action", accessor: "action", align: "left" },
  ];

  const rows = orders.map((item) => ({
    name: <MDTypography variant="caption">{item.receiver}</MDTypography>,
    order_date: (
      <MDTypography variant="caption">
        {(() => {
          const utcDate = new Date(item.order_date);
          utcDate.setHours(utcDate.getHours() + 7);
          return utcDate.toLocaleString("vi-VN");
        })()}
      </MDTypography>
    ),
    address: <MDTypography variant="caption">{item.delivery_address}</MDTypography>,
    phone: <MDTypography variant="caption">{item.phonenumber}</MDTypography>,
    total_price: <MDTypography variant="caption">${item.total_price}</MDTypography>,
    coupon: <MDTypography variant="caption">{item.coupon_sale || "0"}%</MDTypography>,
    status: (
      <MDTypography variant="caption" style={{ color: "red" }}>
        <strong>{item.order_status}</strong>
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" justifyContent="center">
        <Link to={`/order_cancel_detail/${item.id}`} style={{ textDecoration: "none" }}>
          <MDTypography
            variant="caption"
            style={{
              backgroundColor: "#1976d2",
              color: "white",
              padding: "5px 10px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            View
          </MDTypography>
        </Link>
      </MDBox>
    ),
  }));

  return { columns, rows, hasNextPageCancel };
}
