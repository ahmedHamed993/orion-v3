import { getAr } from "@/lib/getAr";
import dayjs from "dayjs";
type Props = {
  order: any;
};

const OrderRow = ({ order }: Props) => {
  return (
    <div className="py-2 flex items-center justify-between">
      <div>
        <p>
          رقم الطلب : <b>{order?.friendly_id}</b>
        </p>
        <p>
          تاريخ الطلب :{" "}
          <b>{dayjs(order.created_at).format("YYYY-MM-DD")}</b>{" "}
        </p>
      </div>
      <div className="flex justify-center gap-1 flex-col items-center">
        {/* {order.} */}
        <h6 className="text-2xl font-bold">{order?.total_order_cost}</h6>
        <StatusChip status={order?.status} />
      </div>
    </div>
  );
};

export default OrderRow;

const StatusChip = ({ status }: { status: string }) => {
  const colors = {
    preparing: {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
    },
    delivering: {
      bg: "bg-sky-100",
      border: "border-sky-200",
    },
    completed: {
      bg: "bg-green-100",
      border: "border-green-200",
    },
    declined: {
      bg: "bg-red-100",
      border: "border-red-200",
    },
    cancelled: {
      bg: "bg-red-100",
      border: "border-red-600",
    },
  };
  // const borderColors = {
  //     preparing:"yellow-300",
  //     delivering:"blue-300",
  //     completed:"green-300",
  //     declined:"red-300",
  //     cancelled:"red-300",
  // }
  // className={`text-xs text-center py-1 px-3 rounded-full font-semibold  border-[1px] bg-yellow-200 border-yellow-400 `}>
  return (
    <div
      className={`text-xs text-center py-1 px-3 rounded-full font-semibold ${colors[status as keyof typeof colors]?.bg} border-2 ${colors[status as keyof typeof colors]?.border}`}
    >
      {getAr(status)}
    </div>
  );
};
