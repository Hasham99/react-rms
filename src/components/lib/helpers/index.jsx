export function getOrderStatus(status) {
  switch (status) {
    case "Placed":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Confirmed":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "SHIPPED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    // case "OUT_FOR_DELIVERY":
    case "Pending":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-blue-gray-700 bg-yellow-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "DELIVERED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}
