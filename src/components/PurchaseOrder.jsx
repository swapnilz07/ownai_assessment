import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ClientDetail from "./ClientDetail";
import TalentDetail from "./TalentDetail";
import { initialValues, validationSchema } from "../config/formConfig";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { v4 as uuidv4 } from "uuid";

const PurchaseOrder = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("vallll===>>", values);

      if (values.poType === "Group PO") {
        const selectedTalents = values.talents.filter(
          (talent) => talent.checked
        );
        if (selectedTalents.length < 2) {
          alert("Please select at least two talents for Group PO.");
          return; // Prevent form submission if validation fails
        }
      }

      const filteredValues = {
        ...values,
        talentDetails: values.talentDetails.map((detail) => ({
          ...detail,
          talents: detail.talents.filter((talent) => talent.checked),
        })),
        // only check talents
        talents: values.talents.filter((talent) => talent.checked),
      };

      console.log("filteredValues==>>", filteredValues);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = formik;

  // Function to push a new talentDetail with a unique ID
  const pushTalentDetail = () => {
    const newTalentDetail = {
      id: uuidv4(), // Generate a unique ID
      jobTitle: "",
      jobID: "",
      talents: [
        {
          id: uuidv4(), // Generate a unique ID for nested items
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

    // Use setFieldValue to "push" the new object into the array
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
                // arrayHelpers={arrayHelpers}
              />
            ))}
          {/* <TalentDetail /> */}
          <div className="d-flex justify-content-center justify-content-md-end gap-2 mt-4 px-3">
            <button
              className=" rounded-pill px-md-4 px-3"
              onClick={() => resetForm()}
            >
              Reset
            </button>
            <button
              className="rounded-pill px-md-4 px-3"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </FormikProvider>
      </div>
    </Container>
  );
};

export default PurchaseOrder;
