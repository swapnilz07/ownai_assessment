import { IoIosArrowBack } from "react-icons/io";
import PurchaseOrder from "./components/PurchaseOrder";

function App() {
  return (
    <>
      <div className="px-3 ">
        <div className="d-flex align-items-center pt-2">
          <IoIosArrowBack
            style={{ color: "red", marginLeft: "10px" }}
            size={28}
          />
          <h5 className="" style={{ marginBottom: "0", marginLeft: "10px" }}>
            Purchase Order | New
          </h5>
        </div>
      </div>
      <PurchaseOrder />
    </>
  );
}

export default App;
