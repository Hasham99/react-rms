export function getOrderStatus(status) {
  switch (status) {
    // case "Placed":
    //   return (
    //     <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
    //       {status.replaceAll("_", " ").toLowerCase()}
    //     </span>
    //   );
    case "unpaid":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs font-medium text-white bg-orange-600">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "not-printed":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs font-medium text-white bg-red-600">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    // case "paid":
    //   return (
    //     <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
    //       {status.replaceAll("_", " ").toLowerCase()}
    //     </span>
    //   );
    // case "OUT_FOR_DELIVERY":
    // case "unpaid":
    //   return (
    //     <span className="capitalize py-1 px-2 rounded-md text-xs text-blue-gray-700 bg-yellow-100">
    //       {status.replaceAll("_", " ").toLowerCase()}
    //     </span>
    //   );
    case "paid":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs font-medium text-white bg-green-600">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "printed":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs font-medium text-white bg-green-600">
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
