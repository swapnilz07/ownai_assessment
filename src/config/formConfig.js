import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

const newId = uuidv4();

export const initialValues = {
  clientName: "",
  poType: "",
  poNumber: "",
  receivedOn: "",
  receivedFrom: { name: "", email: "" },
  poStartDate: "",
  poEndDate: "",
  budget: "",
  currency: "USD",
  talentDetails: [
    {
      id: uuidv4(),
      jobTitle: "",
      jobId: "",
    },
  ],
  talents: [
  ],
};

export const validationSchema = Yup.object().shape({
  clientName: Yup.string().required("Client Name is required"),
  poType: Yup.string().required("Purchase Order Type is required"),
  poNumber: Yup.string().required("Purchase Order No. is required"),
  receivedOn: Yup.date().required("Received On date is required"),
  receivedFrom: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  }),
  poStartDate: Yup.date().required("PO Start Date is required"),
  poEndDate: Yup.date()
    .required("PO End Date is required")
    .min(Yup.ref("poStartDate"), "End date can’t be before start date"),
  budget: Yup.number()
    .required("Budget is required")
    .max(99999, "Budget must be less than 100000"),
  currency: Yup.string().required("Currency is required"),
});
