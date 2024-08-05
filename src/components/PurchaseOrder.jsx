import React from "react";
import { Container } from "react-bootstrap";
import ClientDetail from "./ClientDetail";
import TalentDetail from "./TalentDetail";
import { initialValues, validationSchema } from "../config/formConfig";
import { useFormik, FormikProvider } from "formik";
import { v4 as uuidv4 } from "uuid";

const PurchaseOrder = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const filteredValues = {
        ...values,
        talents: values.talents.filter((talent) => talent.checked),
      };

      console.log("Filtered Values:", filteredValues);

      if (filteredValues.poType === "Group PO") {
        const selectedTalents = filteredValues.talents;
        if (selectedTalents.length < 2) {
          alert("Please select at least two talents for Group PO.");
          return;
        }
      }
    },
  });

  const { values, handleSubmit, resetForm, setFieldValue } = formik;

  // Function to push a new talentDetail with a unique ID
  const pushTalentDetail = () => {
    const newTalentDetail = {
      id: uuidv4(), //to Generate a unique ID for talnt details
      jobTitle: "",
      jobID: "",
      talents: [
        {
          id: uuidv4(), // Generate a unique ID for talents
          contractDuration: "",
          billRate: "",
          currency: "",
          standardTimeBR: "",
          stbrCurrency: "",
          overTimeBR: "",
          otbrCurrency: "",
        },
      ],
    };

    // Used setFieldValue to push the new talentDetails into the values.talentDetails
    setFieldValue("talentDetails", [...values.talentDetails, newTalentDetail]);
  };

  return (
    <Container
      fluid
      className="mt-3 px-5"
      style={{ backgroundColor: "whitesmoke", border: "0px solid black" }}
    >
      <div
        className=""
        style={{
          border: "0px solid black",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          height: "630px",
          overflowY: "auto",
        }}
      >
        <FormikProvider value={formik}>
          <ClientDetail />
          <div
            className="d-flex justify-content-between align-items-cente mb-2 px-3"
            style={{ backgroundColor: "#e9ecef", padding: "0.5rem 1rem" }}
          >
            <h4 className="mb-0">Talent Detail</h4>

            {values?.poType === "Group PO" && (
              <button
                className="px-2"
                style={{
                  borderRadius: "50px",
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
                onClick={pushTalentDetail}
              >
                + Add another
              </button>
            )}
          </div>
          {values.clientName &&
            values.talentDetails.map((talentDetail, index) => (
              <TalentDetail
                key={index}
                index={index}
                uniueId={talentDetail?.id}
                talentDetail={talentDetail}
              />
            ))}
        </FormikProvider>
        <div className="d-flex justify-content-center justify-content-md-end gap-2 mt-4 px-3">
          <button
            className=" rounded-pill px-md-4 px-3"
            onClick={() => resetForm()}
          >
            Reset
          </button>
          <button className="rounded-pill px-md-4 px-3" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PurchaseOrder;
