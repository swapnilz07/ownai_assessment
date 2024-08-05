import React, { useState } from "react";
import ClientDetail from "./ClientDetail";
import TalentDetailSection from "./TalentDetail";

const MainForm = () => {
  // Client Details State
  const [clientName, setClientName] = useState("");
  const [poType, setPoType] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [receivedOn, setReceivedOn] = useState("");
  const [receivedFrom, setReceivedFrom] = useState("");
  const [receivedFromEmail, setReceivedFromEmail] = useState("");
  const [poStartDate, setPoStartDate] = useState("");
  const [poEndDate, setPoEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("");

  // Talent Details State
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [reqSections, setReqSections] = useState([{ id: Date.now() }]);

  // Errors
  const [errors, setErrors] = useState({});

  // Handlers
  const handleChange = (name) => (e) => {
    switch (name) {
      case "clientName":
        setClientName(e.target.value);
        break;
      case "poType":
        setPoType(e.target.value);
        break;
      case "poNumber":
        setPoNumber(e.target.value);
        break;
      case "receivedOn":
        setReceivedOn(e.target.value);
        break;
      case "receivedFrom":
        setReceivedFrom(e.target.value);
        break;
      case "receivedFromEmail":
        setReceivedFromEmail(e.target.value);
        break;
      case "poStartDate":
        setPoStartDate(e.target.value);
        break;
      case "poEndDate":
        setPoEndDate(e.target.value);
        break;
      case "budget":
        setBudget(e.target.value);
        break;
      case "currency":
        setCurrency(e.target.value);
        break;
      default:
        break;
    }
  };

  const handlePoTypeChange = (e) => setPoType(e.target.value);

  const handleJobTitleChange = (e) => setSelectedJob(e.target.value);

  const handleTalentCheck = (id) => {
    setSelectedTalents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((talentId) => talentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddAnother = () => {
    setReqSections([...reqSections, { id: Date.now() }]);
  };

  const handleRemoveReq = (id) => {
    setReqSections(reqSections.filter((section) => section.id !== id));
  };

  return (
    <div>
      <ClientDetail
        // clientName={clientName}
        // poType={poType}
        // poNumber={poNumber}
        // receivedOn={receivedOn}
        // receivedFrom={receivedFrom}
        // receivedFromEmail={receivedFromEmail}
        // poStartDate={poStartDate}
        // poEndDate={poEndDate}
        // budget={budget}
        // currency={currency}
        onchange={handleChange}
        // handlePoTypeChange={handlePoTypeChange}
        // errors={errors}
      />
      {/* <TalentDetailSection
        jobTitles={[]} // Pass the actual job titles list
        talents={[]} // Pass the actual talents list
        selectedJob={selectedJob}
        selectedTalents={selectedTalents}
        handleJobTitleChange={handleJobTitleChange}
        handleTalentCheck={handleTalentCheck}
        handleAddAnother={handleAddAnother}
        handleRemoveReq={handleRemoveReq}
        reqSections={reqSections}
      /> */}
    </div>
  );
};

export default MainForm;
