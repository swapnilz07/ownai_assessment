import { IoIosArrowBack } from "react-icons/io";
import PurchaseOrder from "./components/PurchaseOrder";
import { Toaster } from "react-hot-toast";
import { hover } from "@testing-library/user-event/dist/hover";

function App() {
  return (
    <>
      <div className="px-md-3 px-0">
        <div className="d-flex align-items-center pt-2">
          <IoIosArrowBack
            color="red"
            style={{ marginLeft: "10px" }}
            size={28}
          />
          <h5 className="" style={{ marginBottom: "0", marginLeft: "10px" }}>
            Purchase Order | New
          </h5>
        </div>
      </div>
      <PurchaseOrder />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
