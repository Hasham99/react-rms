import InventoryTable from "./InventoryTable";

const Inventory = () => {
  return (
    <>
      <div className="text-2xl text-[#092635] font-bold py-4">Inventory</div>
      {/* <div className="text-md font-normal py-1">Inventory</div> */}
      <InventoryTable />
    </>
  );
};
export default Inventory;
