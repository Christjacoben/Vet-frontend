import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscDashboard } from "react-icons/vsc";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { LiaListAlt } from "react-icons/lia";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import Calender from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../store/appointmentSlice";
import { fetchPetReports } from "../store/petReportSlice";
import { setProfileImage } from "../store/profileImageSlice";
import { RiCloseCircleFill } from "react-icons/ri";
import { TbFileReport } from "react-icons/tb";
import { FaRegFileLines } from "react-icons/fa6";
import { toast } from "react-toastify";
import Style from "../assets/side-1.png";
import "./Dashboard.css";
import Chat from "./Chat";
import ServiceComponent from "./ServiceComponent";
import defaultProfile from "../assets/default-profile.jpg";
import image1 from "../assets/profile1.jpg";
import image2 from "../assets/profile2.jpg";
import image3 from "../assets/profile3.jpg";
import image4 from "../assets/profile4.jpg";

const images = [image1, image2, image3, image4];

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [dashboardShow, setDashboardShow] = useState(true);
  const [appointmentRequestShow, setAppointmentRequestShow] = useState(false);
  const [listAppointment, setListAppointment] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [serviceShow, setServiceShow] = useState(false);
  const [expandedAppointments, setExpandedAppointments] = useState({});
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [chatShow, setChatShow] = useState(false);
  const [petRecordShow, setPetRecordShow] = useState(false);
  const [petReportShow, setPetReportShow] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [formData, setFormData] = useState({});
  const profileImage = useSelector(
    (state) => state.profileImage.setProfileImage || defaultProfile
  );
  const appointments = useSelector((state) => state.appointments.appointments);
  const loading = useSelector((state) => state.appointments.loading);
  const error = useSelector((state) => state.appointments.error);
  const petReports = useSelector((state) => state.petReport.reportData);
  const loadings = useSelector((state) => state.petReport.loading);
  const errors = useSelector((state) => state.petReport.error);
  const user = useSelector((state) => state.auth.user);

  console.log("user", user);

  useEffect(() => {
    dispatch(fetchAppointment())
      .unwrap()
      .then((data) => {
        console.log("Fetch Appointment", data);
      })
      .catch((err) => {
        console.error("Failed to fetch appointment", err);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPetReports())
      .unwrap()
      .then((data) => {
        console.log("Fetched Pet Reports:", data);
      })
      .catch((err) => {
        console.error("Failed to fetch pet reports", err);
      });
  }, [dispatch]);

  const toggleDashboardShow = () => {
    setDashboardShow(true);
    setAppointmentRequestShow(false);
    setListAppointment(false);
    setReportShow(false);
    setServiceShow(false);
    setPetRecordShow(false);
    setPetReportShow(false);
  };

  const toggleAppointmentShow = () => {
    setAppointmentRequestShow(true);
    setDashboardShow(false);
    setListAppointment(false);
    setReportShow(false);
    setServiceShow(false);
    setPetRecordShow(false);
    setPetReportShow(false);
  };

  const toggleListAppointmentShow = () => {
    setListAppointment(true);
    setAppointmentRequestShow(false);
    setDashboardShow(false);
    setReportShow(false);
    setServiceShow(false);
    setPetRecordShow(false);
    setPetReportShow(false);
  };

  const toggleReportShow = () => {
    setReportShow(true);
    setAppointmentRequestShow(false);
    setDashboardShow(false);
    setListAppointment(false);
    setServiceShow(false);
    setPetRecordShow(false);
    setPetReportShow(false);
  };

  const toggleServiceShow = () => {
    setServiceShow(true);
    setAppointmentRequestShow(false);
    setDashboardShow(false);
    setListAppointment(false);
    setReportShow(false);
    setPetRecordShow(false);
    setPetReportShow(false);
  };

  const togglePetRecordShow = () => {
    setPetRecordShow(true);
    setAppointmentRequestShow(false);
    setDashboardShow(false);
    setListAppointment(false);
    setReportShow(false);
    setServiceShow(false);
    setPetReportShow(false);
  };
  const togglePetReportShow = () => {
    setPetReportShow(true);
    setPetRecordShow(false);
    setAppointmentRequestShow(false);
    setDashboardShow(false);
    setListAppointment(false);
    setReportShow(false);
    setServiceShow(false);
  };

  const handleChatShow = () => {
    setChatShow(!chatShow);
  };

  const handleLogout = () => {
    fetch("https://vet-backend-m3o7.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Failed to log out");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  //continue tomorrow user can choose image profile
  const handleImageSelect = (image) => {
    dispatch(setProfileImage(image));
  };

  const handleAppointmentAction = (appointment, action) => {
    const { appointmentId } = appointment;

    fetch(
      `https://vet-backend-m3o7.onrender.com/api/appointment/${appointmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: action }),
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log(`${action} appointment with ID ${appointmentId}`);

          toast.success(`Appointment ${action} successfully!`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
          });

          dispatch(fetchAppointment());
        } else {
          console.error(`Failed to ${action} appointment`);
          toast.error(`Failed to ${action} appointment. Please try again.`, {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.error("Error", error);
        toast.error("An error occurred while processing your request.", {
          position: "top-center",
        });
      });
  };

  const handleInputChange = (e, field, section, appointmentId) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [appointmentId]: {
        ...prevData[appointmentId],
        [section]: {
          ...prevData[appointmentId]?.[section],
          [field]: value,
        },
      },
    }));
  };

  const groupReportsByEmail = (reports) => {
    return reports.reduce((acc, report) => {
      if (!acc[report.email]) {
        acc[report.email] = [];
      }
      acc[report.email].push(report);
      return acc;
    }, {});
  };

  const toggleFolderExpand = (email) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  };

  const renderAppointmentCards = () => {
    const pendingAppointments = appointments.filter(
      (appointment) => appointment.status === "Pending"
    );
    return pendingAppointments.map((appointment) => {
      const isExpanded = expandedAppointments[appointment.appointmentId];
      return (
        <div key={appointment.appointmentId} className="appointment-card">
          <h3 onClick={() => toggleExpand(appointment.appointmentId)}>
            {appointment.name}
          </h3>
          {isExpanded && (
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Pet type:</strong>
                    </td>
                    <td>{appointment.petType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Breed:</strong>
                    </td>
                    <td>{appointment.breed}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Appointment Date:</strong>
                    </td>
                    <td>
                      {new Date(
                        appointment.appointmentDateTime
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Address:</strong>
                    </td>
                    <td>{appointment.address}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Contact Number:</strong>
                    </td>
                    <td>{appointment.contactNumber}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>
                    <td>{appointment.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Service:</strong>
                    </td>
                    <td>{appointment.serviceOffered || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => handleAppointmentAction(appointment, "Rejected")}
              >
                Reject
              </button>
              <button
                onClick={() => handleAppointmentAction(appointment, "Accepted")}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      );
    });
  };

  const renderAcceptedAppointments = () => {
    return appointments
      .filter((appointment) => appointment.status === "Accepted")
      .map((appointment) => {
        const isExpanded = expandedAppointments[appointment.appointmentId];
        return (
          <div key={appointment.appointmentId} className="appointment-card">
            <h3 onClick={() => toggleExpand(appointment.appointmentId)}>
              {appointment.name}
            </h3>
            {isExpanded && (
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Pet type:</strong>
                      </td>
                      <td>{appointment.petType}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Breed:</strong>
                      </td>
                      <td>{appointment.breed}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Appointment Date:</strong>
                      </td>
                      <td>
                        {new Date(
                          appointment.appointmentDateTime
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Address:</strong>
                      </td>
                      <td>{appointment.address}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Contact Number:</strong>
                      </td>
                      <td>{appointment.contactNumber}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{appointment.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Service:</strong>
                      </td>
                      <td>{appointment.serviceOffered || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => handleChatShow(appointment.appointmentId)}
                >
                  chat
                </button>
                <button
                  style={{ backgroundColor: "green", marginLeft: "10px" }}
                  onClick={() => handleAppointmentAction(appointment, "Done")}
                >
                  Mark Done
                </button>
              </div>
            )}
          </div>
        );
      });
  };

  const renderDoneAppointments = () => {
    return appointments
      .filter((appointment) => appointment.status === "Done")
      .map((appointment) => {
        const isExpanded = expandedAppointments[appointment.appointmentId];
        return (
          <div key={appointment.appointmentId} className="appointment-card">
            <h3 onClick={() => toggleExpand(appointment.appointmentId)}>
              Appointment finished -{appointment.petType}
            </h3>
            {isExpanded && (
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name:</strong>
                      </td>
                      <td>{appointment.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Pet type:</strong>
                      </td>
                      <td>{appointment.petType}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Breed:</strong>
                      </td>
                      <td>{appointment.breed}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Appointment Date:</strong>
                      </td>
                      <td>
                        {new Date(
                          appointment.appointmentDateTime
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Address:</strong>
                      </td>
                      <td>{appointment.address}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Contact Number:</strong>
                      </td>
                      <td>{appointment.contactNumber}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{appointment.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Service:</strong>
                      </td>
                      <td>{appointment.serviceOffered || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      });
  };

  const renderPetReportAppointments = () => {
    return appointments
      .filter((appointment) => appointment.status === "Done")
      .map((appointment) => {
        const isExpanded = expandedAppointments[appointment.appointmentId];
        return (
          <div key={appointment.appointmentId} className="appointment-card">
            <h3 onClick={() => toggleExpand(appointment.appointmentId)}>
              <p style={{ marginLeft: "8rem" }}>
                Pet Record for {appointment.petType}
              </p>
            </h3>
            {isExpanded && (
              <div>
                <div className="pet-information">
                  <h5>Pet Information</h5>
                  <div className="pet-information-card">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Name of pet:</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]?.petInfo
                                  ?.name || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "name",
                                  "petInfo",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Birthday:</strong>
                          </td>
                          <td>
                            <input
                              type="date"
                              value={
                                formData[appointment.appointmentId]?.petInfo
                                  ?.birthday || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "birthday",
                                  "petInfo",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Color/Makings:</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]?.petInfo
                                  ?.colorMarkings || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "colorMarkings",
                                  "petInfo",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Pet type:</strong>
                          </td>
                          <td>{appointment.petType}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Breed:</strong>
                          </td>
                          <td>{appointment.breed}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="appointment-Details">
                  <h5>Owner's Details</h5>
                  <div className="appointment-Details-card">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Name:</strong>
                          </td>
                          <td>{appointment.name}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Appointment Date:</strong>
                          </td>
                          <td>
                            {new Date(
                              appointment.appointmentDateTime
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Address:</strong>
                          </td>
                          <td>{appointment.address}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Contact Number:</strong>
                          </td>
                          <td>{appointment.contactNumber}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Email:</strong>
                          </td>
                          <td>{appointment.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="veterinarians-Details">
                  <h5>Veterinarian's Details</h5>
                  <div className="veterinartians-Details-card">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Name of Veterinarian:</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.veterinarianDetails?.name || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "name",
                                  "veterinarianDetails",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Clinic/Hostpital:</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.veterinarianDetails?.clinicHospital || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "clinicHospital",
                                  "veterinarianDetails",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Address:</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.veterinarianDetails?.address || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "address",
                                  "veterinarianDetails",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Contact Number:</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.veterinarianDetails?.contactNumber || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "contactNumber",
                                  "veterinarianDetails",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="veterinarians-Details">
                  <h5>Parasites Prophylaxis/Treatment</h5>
                  <h5>(Gastrointestinal worms, heartworm, flea & tick)</h5>
                  <div className="veterinartians-Details-card">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Date:</strong>
                          </td>
                          <td>
                            <input
                              type="date"
                              value={
                                formData[appointment.appointmentId]
                                  ?.parasitesTreatment?.date || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "date",
                                  "parasitesTreatment",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Weight(kg):</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.parasitesTreatment?.weight || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "weight",
                                  "parasitesTreatment",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Production Name/Active Ingredient:</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.parasitesTreatment?.productName || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "productName",
                                  "parasitesTreatment",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Veterinarian:</strong>
                            <br />
                            <strong>(PRC Lic,TIN,PTR)</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.parasitesTreatment?.veterinarian || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "veterinarian",
                                  "parasitesTreatment",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="veterinarians-Details">
                  <h5>Rabies Vaccination Record</h5>
                  <div className="veterinartians-Details-card">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Date:</strong>
                          </td>
                          <td>
                            <input
                              type="date"
                              value={
                                formData[appointment.appointmentId]
                                  ?.rabiesVaccination?.date || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "date",
                                  "rabiesVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Vacine Description:</strong>
                            <br />
                            <strong>
                              (Manufacturer, Batch no.,Serial No, Expiry)
                            </strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.rabiesVaccination?.vaccineDescription || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vaccineDescription",
                                  "rabiesVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Next Vaccination Due:</strong>
                          </td>
                          <td>
                            <input
                              type="date"
                              value={
                                formData[appointment.appointmentId]
                                  ?.rabiesVaccination?.nextVaccinationDue || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "nextVaccinationDue",
                                  "rabiesVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Veterinarian:</strong>
                            <br />
                            <strong>(PRC Lic,TIN,PTR)</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.rabiesVaccination?.veterinarian || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "veterinarian",
                                  "rabiesVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="veterinarians-Details">
                  <h5>Multivalent Vaccine Record</h5>
                  <div className="veterinartians-Details-card">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Date:</strong>
                          </td>
                          <td>
                            <input
                              type="date"
                              value={
                                formData[appointment.appointmentId]
                                  ?.multivalentVaccination?.date || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "date",
                                  "multivalentVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Vacine Description:</strong>
                            <br />
                            <strong>
                              (Manufacturer, Batch no.,Serial No, Expiry)
                            </strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.multivalentVaccination
                                  ?.vaccineDescription || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vaccineDescription",
                                  "multivalentVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Next Vaccination Due:</strong>
                          </td>
                          <td>
                            <input
                              type="date"
                              value={
                                formData[appointment.appointmentId]
                                  ?.multivalentVaccination
                                  ?.nextVaccinationDue || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "nextVaccinationDue",
                                  "multivalentVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Veterinarian:</strong>
                            <br />
                            <strong>(PRC Lic,TIN,PTR)</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={
                                formData[appointment.appointmentId]
                                  ?.multivalentVaccination?.veterinarian || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "veterinarian",
                                  "multivalentVaccination",
                                  appointment.appointmentId
                                )
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="Service-Details">
                  <h5>Service Details</h5>
                  <div className="Service-Details-cards">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Service:</strong>
                          </td>
                          <td>{appointment.serviceOffered || "N/A"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <button onClick={() => handleReportSave(appointment)}>
                  Save
                </button>
              </div>
            )}
          </div>
        );
      });
  };

  const renderPetReports = (reports) => {
    return reports.map((report) => {
      const isExpanded = expandedAppointments[report.appointmentId];
      return (
        <div key={report.appointmentId} className="report-card">
          <h3
            style={{ marginLeft: "8rem" }}
            onClick={() => toggleExpand(report.appointmentId)}
          >
            Pet Report for {report.petInfo.petType}
          </h3>
          {isExpanded && (
            <div>
              <div className="pet-report-info-main">
                <h5>Pet Information</h5>
                <div className="pet-report-info-cards">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Name of pet:</strong>
                        </td>
                        <td>{report.petInfo.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Birthday:</strong>
                        </td>
                        <td>
                          {new Date(
                            report.petInfo.birthday
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Color/Makings:</strong>
                        </td>
                        <td>{report.petInfo.colorMarkings}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Pet type:</strong>
                        </td>
                        <td>{report.petInfo.petType}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Breed:</strong>
                        </td>
                        <td>{report.petInfo.breed}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pet-report-owner-main">
                <h5>Owner's Details</h5>
                <div className="pet-report-owner-cards">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Name:</strong>
                        </td>
                        <td>{report.ownerDetails.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Appointment Date:</strong>
                        </td>
                        <td>
                          {new Date(
                            report.ownerDetails.appointmentDateTime
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Address:</strong>
                        </td>
                        <td>{report.ownerDetails.address}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Contact Number:</strong>
                        </td>
                        <td>{report.ownerDetails.contactNumber}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Email:</strong>
                        </td>
                        <td>{report.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pet-report-veteri-main">
                <h5>Veterinarian's Details</h5>
                <div className="pet-report-veteri-cards">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Name of Veterinarian:</strong>
                        </td>
                        <td>{report.veterinarianDetails.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Clinic/Hostpital:</strong>
                        </td>
                        <td>{report.veterinarianDetails.clinicHospital}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Address:</strong>
                        </td>
                        <td>{report.veterinarianDetails.address}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Contact Number:</strong>
                        </td>
                        <td>{report.veterinarianDetails.contactNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pet-report-parasites-main">
                <h5>
                  Parasites Prophylaxis/Treatment <br />
                  (Gastrointestinal worms, heartworm, flea & tick)
                </h5>
                <div className="pet-report-parasites-cards">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Date:</strong>
                        </td>
                        <td>
                          {new Date(
                            report.parasitesTreatment.date
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Weight(Kg):</strong>
                        </td>
                        <td>{report.parasitesTreatment.weight}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Production Name/Active Ingredient:</strong>
                        </td>
                        <td>{report.parasitesTreatment.productName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Veterinarian:</strong>
                          <br />
                          <strong>(PRC Lic,TIN,PTR)</strong>
                        </td>
                        <td>{report.parasitesTreatment.veterinarian}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pet-report-rabies-main">
                <h5>Rabies Vaccination Record</h5>
                <div className="pet-report-rabies-cards">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Date:</strong>
                        </td>
                        <td>
                          {" "}
                          {new Date(
                            report.rabiesVaccination.date
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Vaccine Description:</strong>
                          <br />
                          <strong>
                            (Manufacturer, Batch no., Serial No, Expiry)
                          </strong>
                        </td>
                        <td>{report.rabiesVaccination.vaccineDescription}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Next Vaccination Due:</strong>
                        </td>
                        <td>
                          {" "}
                          {new Date(
                            report.rabiesVaccination.nextVaccinationDue
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Veterinarian:</strong>
                          <br />
                          <strong>(PRC Lic, TINE, PTR)</strong>
                        </td>
                        <td>{report.rabiesVaccination.veterinarian}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pet-report-multivac-main">
                <h5>Multivalent Vaccine Record</h5>
                <div className="pet-report-multivac-cards">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Date:</strong>
                        </td>
                        <td>
                          {" "}
                          {new Date(
                            report.multivalentVaccination.date
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Vaccine Description:</strong>
                          <br />
                          <strong>
                            (Manufacturer, Batch no., Serial No, Expiry)
                          </strong>
                        </td>
                        <td>
                          {report.multivalentVaccination.vaccineDescription}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Next Vaccination Due:</strong>
                        </td>
                        <td>
                          {" "}
                          {new Date(
                            report.multivalentVaccination.nextVaccinationDue
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Veterinarian:</strong>
                          <br />
                          <strong>(PRC Lic, TINE, PTR)</strong>
                        </td>
                        <td>{report.multivalentVaccination.veterinarian}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pet-report-service-main">
                <h5>Servive Details</h5>
                <div className="pet-report-service-cards">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Service Offered:</strong>
                        </td>
                        <td>{report.serviceDetails.service || "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const renderGroupedReports = () => {
    const groupedReports = groupReportsByEmail(petReports);
    return Object.keys(groupedReports).map((email) => {
      const isExpanded = expandedFolders[email];
      return (
        <div key={email} className="folder">
          <h3
            onClick={() => toggleFolderExpand(email)}
            className="folder-header"
          >
            Folder by: {email}
          </h3>
          {isExpanded && (
            <div className="folder-content">
              {groupedReports[email].map((report) => (
                <div key={report.appointmentId} className="report">
                  {renderPetReports([report])}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const handleReportSave = async (appointment) => {
    const dataToSave = {
      appointmentId: appointment.appointmentId,
      email: appointment.email,
      status: "Done",
      petInfo: {
        name: formData[appointment.appointmentId]?.petInfo?.name || "",
        birthday: formData[appointment.appointmentId]?.petInfo?.birthday || "",
        colorMarkings:
          formData[appointment.appointmentId]?.petInfo?.colorMarkings || "",
        petType: appointment.petType,
        breed: appointment.breed,
      },
      ownerDetails: {
        name: appointment.name,
        appointmentDate: new Date(appointment.appointmentDate).toISOString(),
        address: appointment.address,
        contactNumber: appointment.contactNumber,
      },
      veterinarianDetails: {
        name:
          formData[appointment.appointmentId]?.veterinarianDetails?.name || "",
        clinicHospital:
          formData[appointment.appointmentId]?.veterinarianDetails
            ?.clinicHospital || "",
        address:
          formData[appointment.appointmentId]?.veterinarianDetails?.address ||
          "",
        contactNumber:
          formData[appointment.appointmentId]?.veterinarianDetails
            ?.contactNumber || "",
      },
      parasitesTreatment: {
        date:
          formData[appointment.appointmentId]?.parasitesTreatment?.date || "",
        weight:
          formData[appointment.appointmentId]?.parasitesTreatment?.weight || "",
        productName:
          formData[appointment.appointmentId]?.parasitesTreatment
            ?.productName || "",
        veterinarian:
          formData[appointment.appointmentId]?.parasitesTreatment
            ?.veterinarian || "",
      },
      rabiesVaccination: {
        date:
          formData[appointment.appointmentId]?.rabiesVaccination?.date || "",
        vaccineDescription:
          formData[appointment.appointmentId]?.rabiesVaccination
            ?.vaccineDescription || "",
        nextVaccinationDue:
          formData[appointment.appointmentId]?.rabiesVaccination
            ?.nextVaccinationDue || "",
        veterinarian:
          formData[appointment.appointmentId]?.rabiesVaccination
            ?.veterinarian || "",
      },
      multivalentVaccination: {
        date:
          formData[appointment.appointmentId]?.multivalentVaccination?.date ||
          "",
        vaccineDescription:
          formData[appointment.appointmentId]?.multivalentVaccination
            ?.vaccineDescription || "",
        nextVaccinationDue:
          formData[appointment.appointmentId]?.multivalentVaccination
            ?.nextVaccinationDue || "",
        veterinarian:
          formData[appointment.appointmentId]?.multivalentVaccination
            ?.veterinarian || "",
      },
      serviceDetails: {
        service: appointment.serviceOffered || "N/A",
      },
    };

    console.log("Pet Report Data:", dataToSave);

    try {
      const response = await fetch(
        `https://vet-backend-m3o7.onrender.com/api/pet-reports/${appointment.appointmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Pet report saved successfully:", result);
        setFormData({});
        toast.success("Pet report saved successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to save pet report:", errorData);
        toast.error("Failed to save pet report. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error saving pet report:", error);
      toast.error("An error occurred while saving the pet report.", {
        position: "top-center",
      });
    }
  };

  const toggleExpand = (appoinmentId) => {
    setExpandedAppointments((prev) => ({
      ...prev,
      [appoinmentId]: !prev[appoinmentId],
    }));
    setSelectedAppointmentId(appoinmentId);
  };

  const selectedAppointment = appointments.find(
    (appt) => appt.appointmentId === selectedAppointmentId
  );

  const appointmentDates = Array.from(
    new Set(
      appointments.map((appointment) =>
        new Date(appointment.appointmentDate).toDateString()
      )
    )
  );

  const titleClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      return appointmentDates.includes(dateString) ? "highlight" : null;
    }
  };

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending" || !appointment.status
  ).length;

  const acceptedCount = appointments.filter(
    (appointment) => appointment.status === "Accepted"
  ).length;

  const rejectedCount = appointments.filter(
    (appointment) => appointment.status === "Rejected"
  ).length;

  return (
    <div className="main-con">
      <div className="admin-header">
        <ul>
          <img src={profileImage} alt="Profile" className="profile-image" />
        </ul>
      </div>

      <div className="child-con">
        <div className="left-con">
          <div
            className={`dash-category ${dashboardShow ? "active" : ""}`}
            onClick={toggleDashboardShow}
          >
            <VscDashboard className="icons" size={30} color="orange" />
            <p>Dashboard</p>
          </div>
          <div
            className={`dash-category ${
              appointmentRequestShow ? "active" : ""
            }`}
            onClick={toggleAppointmentShow}
          >
            <VscGitPullRequestGoToChanges
              className="icons"
              size={30}
              color="brown"
            />
            <p>Appointment request</p>
          </div>

          <div
            className={`dash-category ${reportShow ? "active" : ""}`}
            onClick={toggleReportShow}
          >
            <TbReport className="icons" size={30} color="green" />
            <p>Reports</p>
          </div>

          <div
            className={`dash-category ${listAppointment ? "active" : ""}`}
            onClick={toggleListAppointmentShow}
          >
            <LiaListAlt className="icons" size={30} color="blue" />
            <p>List of Appointment</p>
          </div>
          <div
            className={`dash-category ${serviceShow ? "active" : ""}`}
            onClick={toggleServiceShow}
          >
            <MdOutlineMiscellaneousServices
              className="icons"
              size={30}
              color="red"
            />
            <p>Service</p>
          </div>
          <div
            className={`dash-category ${petRecordShow ? "active" : ""}`}
            onClick={togglePetRecordShow}
          >
            <TbFileReport className="icons" size={30} color="#f96d00" />
            <p>Pet record</p>
          </div>
          <div
            className={`dash-category ${petReportShow ? "active" : ""}`}
            onClick={togglePetReportShow}
          >
            <FaRegFileLines className="icons" size={30} color="#ffc93c" />
            <p>Pet report</p>
          </div>
          <div onClick={handleLogout} className="dash-category">
            <TbLogout className="icons" size={30} />
            <p>Logout</p>
          </div>
        </div>
        <div className="right-con">
          <img src={Style} alt="style" />
          <img src={Style} alt="style" className="right-style" />
          {dashboardShow && (
            <div>
              <div className="appointment-main">
                <div className="appointment-category">
                  <p>Pending Appointments ({pendingCount})</p>
                  <p></p>
                </div>
                <div className="appointment-category">
                  <p>Confirmed Appointments ({acceptedCount})</p>
                </div>
                <div className="appointment-category">
                  <p>Cancelled Appointments ({rejectedCount})</p>
                </div>
              </div>
              <div className="calendar">
                <p>Appoinment Schedule</p>
                <Calender
                  onChange={setDate}
                  value={date}
                  view="month"
                  navigationLabel={({ date, view, label }) =>
                    `${new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      year: "numeric",
                    }).format(date)}`
                  }
                  onActiveStartDateChange={({ activeStartDate }) =>
                    setDate(activeStartDate)
                  }
                  tileClassName={titleClassName}
                />
              </div>
            </div>
          )}
          {appointmentRequestShow && (
            <div className="appointment-req">
              <div className="appointreq-child">
                <p>List of Appointments</p>
                <div className="appointments-list">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error loading appointments: {error}</p>
                  ) : (
                    renderAppointmentCards()
                  )}
                </div>
              </div>
            </div>
          )}
          {listAppointment && (
            <div className="list-appointment">
              <p>Accepted Appointment</p>
              <div className="list-content">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error loading appointments: {error}</p>
                ) : (
                  renderAcceptedAppointments()
                )}
              </div>
            </div>
          )}

          {reportShow && (
            <div className="report-main-content">
              <p>Appointment Finished</p>
              <div className="report-main">
                <div className="report-conten">{renderDoneAppointments()}</div>
              </div>
            </div>
          )}

          {serviceShow && (
            <div className="service-main">
              <ServiceComponent />
            </div>
          )}
          <div className="chat">
            {chatShow && selectedAppointmentId && selectedAppointment && (
              <div className="chat-container">
                <h4 className="chat-with">
                  Chat with {selectedAppointment.name}
                  <RiCloseCircleFill
                    size={30}
                    className="close-chat"
                    onClick={handleChatShow}
                  />
                </h4>
                <Chat
                  appointmentId={selectedAppointmentId}
                  onmessageSend={(newMessage) =>
                    console.log("Sent message:", newMessage)
                  }
                />
              </div>
            )}
          </div>
          {petRecordShow && (
            <div className="pet-report-main">
              <p
                style={{
                  marginLeft: "31rem",
                  marginTop: "-1rem",
                  fontSize: "30px",
                  color: "#ff9a3c",
                  fontWeight: "bold",
                }}
              >
                Pet Record
              </p>
              <div className="pet-report-conten">
                {renderPetReportAppointments()}
              </div>
            </div>
          )}
          {petReportShow && (
            <div className="reports-main-content">
              <p>Pet Reports</p>
              <div className="reports-content">{renderGroupedReports()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
