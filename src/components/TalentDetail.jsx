import React, { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { Col, Form, FormCheck, Row } from "react-bootstrap";
import { useFormikContext } from "formik";
import {
  CLIENT_NAMES,
  CURRENCIES,
  JOB_TITLES,
  TALENTS_USERS,
} from "../config/constants/constant";
import { v4 as uuidv4 } from "uuid";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const TalentDetail = ({
  talentDetail,
  index,
  uniueId,
  isSubmitted,
  removeTalentDetail,
}) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext();

  // State to manage accordion open/close
  const [isOpen, setIsOpen] = useState(false);

  const jobTitleList = useMemo(() => {
    if (!values?.clientName) return [];
    const clientNameData = CLIENT_NAMES.find(
      (value) => value.name == values.clientName
    );
    const jobTitleData = JOB_TITLES.filter(
      (t) => t.clientId === clientNameData?.id || !t.id
    );
    return jobTitleData;
  }, [values?.clientName]);

  const talentUsrsList = useMemo(() => {
    if (!talentDetail?.jobId) return [];
    const userList = TALENTS_USERS.filter(
      (t) => t.reqID === talentDetail?.jobId
    ).map((t) => {
      const talentExists = values.talents.find(
        (talent) => talent.userId === t.id
      );
      if (talentExists) {
        return {
          ...t,
          checked: talentExists.checked,
          contractDuration: talentExists.contractDuration,
          billRate: talentExists.billRate,
          currency: talentExists.currency,
          standardTimeBR: talentExists.standardTimeBR,
          stbrCurrency: talentExists.stbrCurrency,
          overTimeBR: talentExists.overTimeBR,
          otbrCurrency: talentExists.otbrCurrency,
        };
      }
      return t;
    });
    return userList;
  }, [talentDetail, values]);

  // Function to handle input change
  const handleJobTitleInput = (id, value) => {
    const index = values.talentDetails.findIndex(
      (detail) => String(detail.id) === String(id)
    );
    const jobTitleData = JOB_TITLES.find((t) => t.id === value);

    if (index !== -1 && jobTitleData) {
      setFieldValue(`talentDetails.${index}.jobTitle`, jobTitleData?.title);
      setFieldValue(`talentDetails.${index}.jobId`, jobTitleData?.reqID);
    }
  };

  // Function to handle adding new talent
  const handleAddTalent = (id, field, value) => {
    const newTalent = {
      id: uuidv4(), // Unique ID for each talent
      userId: "",
      contractDuration: "",
      billRate: "",
      currency: "",
      standardTimeBR: "",
      stbrCurrency: "",
      overTimeBR: "",
      otbrCurrency: "",
    };

    const index = values.talents.findIndex((detail) => detail.userId === id);

    if (index !== -1) {
      setFieldValue(`talents.${index}.${field}`, value);
    }
  };

  const handleTalentCheck = (id, checked) => {
    const newTalent = {
      id: uuidv4(), // Unique ID for each talent
      userId: id,
      contractDuration: "",
      billRate: "",
      currency: "",
      standardTimeBR: "",
      stbrCurrency: "",
      overTimeBR: "",
      otbrCurrency: "",
      checked: checked,
      talentDetailId: uniueId,
    };

    const index = values.talents.findIndex((detail) => detail.userId === id);
    const updatedTalents = [...values.talents, newTalent];

    if (index !== -1) {
      setFieldValue(`talents.${index}.checked`, checked);
    } else {
      setFieldValue("talents", updatedTalents);
    }
  };

  return (
    <div className={` ${index !== 0 ? "mt-3" : ""}`}>
      {/* Main section of talent as accordion header */}
      <div
        className="d-flex flex-md-row flex-column justify-content-between align-items-center  px-3 mt-0"
        style={{
          backgroundColor: "#e9ecef",
          borderBottom: "1px solid grey",
        }}
        // onClick={() => setIsOpen(!isOpen)} // Toggle accordion state
      >
        <Form className="w-100">
          <Row className="mb-3">
            <Col className="py-2" lg={3} md={6} xs={12}>
              <Form.Group controlId="formJobTitle">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Job Title/REQ Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="Job Title"
                  aria-label="Default select example"
                  value={talentDetail?.jobId}
                  onChange={(e) => {
                    handleJobTitleInput(talentDetail?.id, e.target.value);
                  }}
                  disabled={isSubmitted}
                >
                  {jobTitleList.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={3} md={6} xs={12} className="py-2">
              <Form.Group controlId="formJobID">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Job ID/REQ ID<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={talentDetail?.jobId}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <div className="d-flex align-items-center">
          <Tooltip title="Delete" placement="top">
            <IconButton>
              <DeleteIcon onClick={() => removeTalentDetail(uniueId)} />
            </IconButton>
          </Tooltip>

          {isOpen ? (
            <Tooltip title="Close" placement="top">
              <IconButton>
                <RemoveIcon size={15} onClick={() => setIsOpen(false)} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Open" placement="top">
              <IconButton>
                <AddIcon size={15} onClick={() => setIsOpen(true)} />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Talents section as accordion body */}
      {isOpen && (
        <div style={{ backgroundColor: "#e9ecef" }}>
          {talentUsrsList.map((talent) => (
            <div key={talent.id} className="py-2">
              <Form className="px-3">
                <Row>
                  <Col xs={6} key={talent.id}>
                    <FormCheck
                      type="checkbox"
                      id={`talent-checkbox-${talent.id}`}
                      label={talent.name}
                      checked={talent.checked}
                      onChange={(e) =>
                        handleTalentCheck(talent.id, e.target.checked)
                      }
                      disabled={isSubmitted}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={3} md={3} sm={12}>
                    <Form.Group controlId={`formContractDuration-${talent.id}`}>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Contract Duration
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter duration"
                        value={talent.contractDuration}
                        onChange={(e) =>
                          handleAddTalent(
                            talent.id,
                            "contractDuration",
                            e.target.value
                          )
                        }
                        disabled={!talent.checked || isSubmitted}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={12}>
                    <Form.Group controlId={`formBillRate-${talent.id}`}>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Bill Rate
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter bill rate"
                        value={talent.billRate}
                        onChange={(e) =>
                          handleAddTalent(talent.id, "billRate", e.target.value)
                        }
                        disabled={!talent.checked || isSubmitted}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={1} md={3} sm={12}>
                    <Form.Group controlId={`formCurrency-${talent.id}`}>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Currency
                      </Form.Label>
                      <Form.Select
                        aria-label="Currency select"
                        value={talent.currency}
                        onChange={(e) =>
                          handleAddTalent(talent.id, "currency", e.target.value)
                        }
                        disabled={!talent.checked || isSubmitted}
                      >
                        {CURRENCIES.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={12}>
                    <Form.Group controlId={`formStandardTimeBR-${talent.id}`}>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Standard Time BR
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter rate"
                        value={talent.standardTimeBR}
                        onChange={(e) =>
                          handleAddTalent(
                            talent.id,
                            "standardTimeBR",
                            e.target.value
                          )
                        }
                        disabled={!talent.checked || isSubmitted}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={1} md={3} sm={12}>
                    <Form.Group controlId={`formCurrency-${talent.id}`}>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Currency
                      </Form.Label>
                      <Form.Select
                        aria-label="Currency select"
                        value={talent.stbrCurrency}
                        onChange={(e) =>
                          handleAddTalent(
                            talent.id,
                            "stbrCurrency",
                            e.target.value
                          )
                        }
                        disabled={!talent.checked || isSubmitted}
                      >
                        {CURRENCIES.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={12}>
                    <Form.Group controlId={`formOverTimeBR-${talent.id}`}>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Over Time BR
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter rate"
                        value={talent.overTimeBR}
                        onChange={(e) =>
                          handleAddTalent(
                            talent.id,
                            "overTimeBR",
                            e.target.value
                          )
                        }
                        disabled={!talent.checked || isSubmitted}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={1} md={3} sm={12}>
                    <Form.Group controlId={`formCurrency-${talent.id}`}>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Currency
                      </Form.Label>
                      <Form.Select
                        aria-label="Currency select"
                        value={talent.otbrCurrency}
                        onChange={(e) =>
                          handleAddTalent(
                            talent.id,
                            "otbrCurrency",
                            e.target.value
                          )
                        }
                        disabled={!talent.checked || isSubmitted}
                      >
                        {CURRENCIES.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TalentDetail;
