// Constants for dropdown options

// Client Names (example options)
export const CLIENT_NAMES = [
  { id: "1", name: "Select Client Name", value: "" },
  {
    id: "1",
    name: "Collabera - Collabera Inc",
    value: "Collabera - Collabera Inc",
  },
  {
    id: "2",
    name: "Futurebridge - Futurebridge Inc",
    value: "Futurebridge - Futurebridge Inc",
  },
  {
    id: "3",
    name: "Capritech - Capritech Inc",
    value: "Capritech - Capritech Inc",
  },
];

// Purchase Order Types
export const PO_TYPES = [
  { value: "Group PO", label: "Group PO" },
  { value: "Individual PO", label: "Individual PO" },
];

// Currencies
export const CURRENCIES = [
  { value: "USD", label: "USD - Dollars ($)" },
  { value: "EUR", label: "EUR - Euros (€)" },
  { value: "INR", label: "INR - Indian Rupees (₹)" },
];

// Example Job Titles/REQs (this should be dynamically loaded based on the selected client)
export const JOB_TITLES = [
  { id: "", title: "Select Job Title", reqID: "", clientId: "" },
  {
    id: "REQ001",
    title: "Application Development",
    reqID: "REQ001",
    clientId: "1",
  },
  { id: "REQ002", title: "Data Scientist", reqID: "REQ002", clientId: "1" },
  { id: "REQ003", title: "Product Management", reqID: "REQ003", clientId: "1" },
  {
    id: "REQ004",
    title: "Software Development",
    reqID: "REQ004",
    clientId: "2",
  },
  { id: "REQ005", title: "Web Development", reqID: "REQ005", clientId: "2" },
  {
    id: "REQ006",
    title: "Application Development",
    reqID: "REQ006",
    clientId: "3",
  },
  {
    id: "REQ007",
    title: "Softwate Development",
    reqID: "REQ007",
    clientId: "3",
  },
  { id: "REQ008", title: "Web Development", reqID: "REQ008", clientId: "3" },
];

// Example Talents (this should be dynamically loaded based on the selected job title)
export const TALENTS_USERS = [
  { id: "1", name: "Swapnil", reqID: "REQ001" },
  { id: "2", name: "Vinaya", reqID: "REQ001" },
  { id: "3", name: "Riddhesh", reqID: "REQ001" },
  { id: "4", name: "Abhilash", reqID: "REQ002" },
  { id: "5", name: "Bhavesh", reqID: "REQ002" },
  { id: "6", name: "Amit", reqID: "REQ002" },
  { id: "7", name: "Mahesh", reqID: "REQ003" },
  { id: "8", name: "Siddhesh", reqID: "REQ003" },
  { id: "9", name: "Chetan", reqID: "REQ003" },
  { id: "10", name: "Prajwal", reqID: "REQ004" },
  { id: "11", name: "Sapna", reqID: "REQ004" },
  { id: "12", name: "Sangeeta", reqID: "REQ005" },
];
