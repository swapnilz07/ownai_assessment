import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  CLIENT_NAMES,
  PO_TYPES,
  CURRENCIES,
} from "../config/constants/constant";
import { useFormikContext } from "formik";

const ErrorComponent = ({ errorText }) => {
  return (
    <div className="text-danger mt-1 ms-1" style={{ fontSize: "13px" }}>
      {errorText}
    </div>
  );
};

const ClientDetail = ({ isSubmitted }) => {
  const { values, errors, touched, handleChange } = useFormikContext();
  // console.log("values", errors);
  // console.log("values===", touched);

  return (
    <>
      <Form className="px-3">
        <Row className="mb-4">
          <Col lg={3} md={6} sm={12}>
            <Form.Label style={{ fontWeight: "bold" }}>
              Client Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="clientName"
              value={values.clientName}
              onChange={handleChange}
              placeholder="Enter a client name"
              disabled={isSubmitted}
            >
              {CLIENT_NAMES.map((val) => (
                <>
                  <option value={val.value}>{val.name}</option>
                </>
              ))}
            </Form.Select>
            {errors.clientName && touched.clientName && (
              <ErrorComponent errorText={errors.clientName} />
            )}
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Form.Group controlId="formOrderType">
              <Form.Label style={{ fontWeight: "bold" }}>
                Purchase Order Type<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="poType"
                value={values.poType}
                onChange={handleChange}
                disabled={isSubmitted}
              >
                <option>Select PO Type</option>
                {PO_TYPES.map((val) => (
                  <option value={val.value}>{val.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
            {errors.poType && touched.poType && (
              <ErrorComponent errorText={errors.poType} />
            )}
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Form.Group controlId="formOrderNumber">
              <Form.Label style={{ fontWeight: "bold" }}>
                Purchase Order No.<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="PO Number"
                pattern="[A-Za-z0-9\s\W]+"
                required
                name="poNumber"
                value={values.poNumber}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </Form.Group>
            {errors.poNumber && touched.poNumber && (
              <ErrorComponent errorText={errors.poNumber} />
            )}
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Form.Group controlId="formReceivedOn">
              <Form.Label style={{ fontWeight: "bold" }}>
                Received On<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Recieved On"
                name="receivedOn"
                value={values.receivedOn}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </Form.Group>
            {errors.receivedOn && touched.receivedOn && (
              <ErrorComponent errorText={errors.poNumber} />
            )}
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={2} md={4} sm={12}>
            <Form.Group controlId="formReceivedFrom">
              <Form.Label style={{ fontWeight: "bold" }}>
                Received From<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Received from Name"
                name="receivedFrom.name"
                value={values.receivedFrom.name}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </Form.Group>
            {errors.receivedFrom?.name && touched.receivedFrom?.name && (
              <ErrorComponent errorText={errors.receivedFrom?.name} />
            )}
          </Col>
          <Col lg={2} md={4} sm={12}>
            <Form.Group controlId="formReceivedFromEmail">
              <Form.Label style={{ fontWeight: "bold" }}>&nbsp;</Form.Label>
              <Form.Control
                type="email"
                placeholder="Recieved From Email ID"
                name="receivedFrom.email"
                value={values.receivedFrom.email}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </Form.Group>
            {errors.receivedFrom?.email && touched.receivedFrom?.email && (
              <ErrorComponent errorText={errors.receivedFrom?.email} />
            )}
          </Col>
          <Col lg={2} md={4} sm={12}>
            <Form.Group controlId="formPOStartDate">
              <Form.Label style={{ fontWeight: "bold" }}>
                PO Start Date<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Start Date {DatePicker}"
                name="poStartDate"
                value={values.poStartDate}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </Form.Group>
            {errors.poStartDate && touched.poStartDate && (
              <ErrorComponent errorText={errors.poStartDate} />
            )}
          </Col>
          <Col lg={2} md={4} sm={12}>
            <Form.Group controlId="formPOEndDate">
              <Form.Label style={{ fontWeight: "bold" }}>
                PO End Date<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="End Date {DatePicker}"
                name="poEndDate"
                value={values.poEndDate}
                onChange={handleChange}
                disabled={isSubmitted}
              />
            </Form.Group>
            {errors.poEndDate && touched.poEndDate && (
              <ErrorComponent errorText={errors.poEndDate} />
            )}
          </Col>
          <Col lg={2} md={4} sm={12}>
            <Form.Group controlId="formBudget">
              <Form.Label style={{ fontWeight: "bold" }}>
                Budget<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Budget"
                maxLength="5"
                name="budget"
                value={values.budget}
                onChange={handleChange}
                inputMode="numeric"
                disabled={isSubmitted}
              />
              <Form.Control.Feedback type="invalid">
                {/* {errorMessage} */}
              </Form.Control.Feedback>
            </Form.Group>
            {errors.budget && touched.budget && (
              <ErrorComponent errorText={errors.budget} />
            )}
          </Col>
          <Col lg={2} md={4} sm={12}>
            <Form.Group controlId="formCurrency">
              <Form.Label style={{ fontWeight: "bold" }}>
                Currency<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="currency"
                value={values.currency}
                onChange={handleChange}
                disabled={isSubmitted}
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {errors.currency && touched.currency && (
              <ErrorComponent errorText={errors.currency} />
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ClientDetail;
