import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GrStatusInfo } from "react-icons/gr";
import { toast } from "react-toastify";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import Style from "../assets/side-1.png";
import Profile3 from "../assets/profile3.jpg";
import "./UserDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../store/appointmentSlice";
import { useParams } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import Chat from "./Chat";
import UserService from "./UserService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserDashboard() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointmentShow, setAppointmentShow] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [listServiceShow, setListServiceShow] = useState(true);
  const [expandedAppointments, setExpandedAppointments] = useState({});
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [userChatClose, setUserChatClose] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    contactNumber: "",
    petType: "select",
    breed: "",
    appointmentDateTime: new Date(),
    service: "select",
  });
  const appointments = useSelector((state) => state.appointments.appointments);
  const loading = useSelector((state) => state.appointments.loading);
  const error = useSelector((state) => state.appointments.error);

  const [bookedSlots, setBookedSlots] = useState([]);
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
    dispatch(fetchAppointment())
      .unwrap()
      .then((data) => {
        const bookedDates = data.map((appointment) => {
          const utcDate = new Date(appointment.appointmentDateTime);
          return new Date(
            utcDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
          );
        });
        setBookedSlots(bookedDates);
      })
      .catch((err) => {
        console.error("Failed to fetch appointment", err);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log("user ID", userId);
  }, [userId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogoutUser = () => {
    fetch("https://vet-backend-zi39.onrender.com/api/logout", {
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

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      email: "",
      contactNumber: "",
      petType: "select",
      breed: "",
      appointmentDateTime: new Date(),
      service: "select",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://vet-backend-zi39.onrender.com/api/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success("Successfully saved: " + data.message, {
            autoClose: 1000,
            position: "top-center",
          });
          resetForm();
        } else {
          toast.error(
            "Maximum appointments reached for the day try again tomorrow",
            {
              autoClose: 4000,
              position: "top-center",
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error submitting appointment:", error);
        toast.error("Error occurred while submitting appointment");
      });
  };

  const toggleAppointmentForm = () => {
    setAppointmentShow(!appointmentShow);
    setStatusShow(false);
    setListServiceShow(false);
  };

  const toggleStatusShow = () => {
    setStatusShow(!statusShow);
    setAppointmentShow(false);
    setListServiceShow(false);
  };

  const toggleListServiceShow = () => {
    setListServiceShow(true);
    setStatusShow(false);
    setAppointmentShow(false);
  };

  const toggleUserChatClose = () => {
    setUserChatClose((prev) => !prev);
  };

  const filteredAppointments = Array.isArray(appointments)
    ? appointments.filter((appointment) => appointment.userId === userId)
    : [];

  const renderAcceptedAppointments = () => {
    return filteredAppointments.map((appointment) => {
      const isExpanded = expandedAppointments[appointment.appointmentId];
      let statusLabel = appointment.status || "Pending";
      let statusClass = "";

      if (statusLabel === "Accepted") {
        statusClass = "status-accepted";
      } else if (statusLabel === "Rejected") {
        statusClass = "status-rejected";
      } else if (statusLabel === "Done") {
        statusClass = "status-done";
      } else {
        statusClass = "status-pending";
      }

      return (
        <div key={appointment.appointmentId} className="appointment-user-card">
          <h3 onClick={() => toggleExpand(appointment.appointmentId)}>
            {appointment.name}
          </h3>
          <p className={statusClass}>{statusLabel}</p>
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
                      ).toLocaleString()}
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
              {statusLabel === "Accepted" && (
                <button
                  onClick={() => {
                    setSelectedAppointmentId(appointment.appointmentId);
                    setUserChatClose(false);
                  }}
                >
                  Chat
                </button>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const toggleExpand = (appoinmentId) => {
    setExpandedAppointments((prev) => ({
      ...prev,
      [appoinmentId]: !prev[appoinmentId],
    }));
  };

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      const isDuplicate = bookedSlots.some(
        (bookedDate) =>
          bookedDate.toDateString() === date.toDateString() &&
          bookedDate.getHours() === date.getHours() &&
          bookedDate.getMinutes() === date.getMinutes()
      );

      if (isDuplicate) {
        toast.error(
          "This time is already booked. Please select a different time.",
          {
            autoClose: 2000,
            position: "top-center",
          }
        );
      } else {
        setFormData({ ...formData, appointmentDateTime: date });
      }
    } else {
      console.error("Invalid date selected");
    }
  };

  const isDateBooked = (date) => {
    return bookedSlots.some(
      (bookedDate) => bookedDate.toDateString() === date.toDateString()
    );
  };

  const isTimeBooked = (time) => {
    return bookedSlots.some(
      (bookedDate) =>
        bookedDate.toDateString() ===
          formData.appointmentDateTime.toDateString() &&
        bookedDate.getHours() === time.getHours() &&
        bookedDate.getMinutes() === time.getMinutes()
    );
  };

  return (
    <div className="user-main">
      <img className="Style" src={Style} alt="user-style" />
      <div className="header-user">
        <ul>
          <div className="user-header">
            <img src={Profile3} alt="profile3" />
          </div>
          <div className="user-header" onClick={toggleAppointmentForm}>
            <VscGitPullRequestGoToChanges
              color="orange"
              className="user-icons"
              size={30}
            />
            <p>appointment</p>
          </div>
          <div className="user-header" onClick={toggleStatusShow}>
            <GrStatusInfo color="green" className="user-icons" size={30} />
            <p>appointment status </p>
          </div>
          <div className="user-header" onClick={toggleListServiceShow}>
            <MdOutlineMiscellaneousServices
              color="red"
              className="user-icons"
              size={30}
            />
            <p>list of services</p>
          </div>
          <div className="user-header" onClick={handleLogoutUser}>
            <TbLogout color="#3e4a61" className="user-icons" size={30} />
            <p>logout</p>
          </div>
        </ul>
      </div>
      {appointmentShow && (
        <div className="appointment-form">
          <div className="child-user-con">
            <div className="title">
              <div className="appoint-title">
                <p>Set Appointment</p>
              </div>
            </div>
            <div className="items">
              <label htmlFor="name">Enter Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Enter"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="items">
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                type="text"
                placeholder="Enter"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="items">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                placeholder="Enter"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="items">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                id="contactNumber"
                type="text"
                placeholder="Enter"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="items">
              <label htmlFor="petType">Select Pet</label>
              <select
                name="petType"
                id="petType"
                value={formData.petType}
                onChange={handleInputChange}
              >
                <option value="select">Select </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
                <option value="bird">Bird</option>
                <option value="hamster">Hamster</option>
                <option value="guineaPig">Guinea Pig</option>
                <option value="turtle">Turtle</option>
                <option value="fish">Fish</option>
                <option value="lizard">Lizard</option>
                <option value="snake">Snake</option>
              </select>
            </div>
            <div className="items">
              <label htmlFor="breed">Enter Breed:</label>
              <input
                id="breed"
                type="text"
                placeholder="Enter"
                value={formData.breed}
                onChange={handleInputChange}
              />
            </div>
            <div className="items">
              <label htmlFor="appointmentDate">Select Date/Time</label>
              <DatePicker
                selected={formData.appointmentDateTime}
                onChange={handleDateChange}
                showTimeSelect
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time (PHT)"
                className="custom-datepicker"
                calendarClassName="custom-calendar"
                timeZone="Asia/Manila"
                dayClassName={(date) =>
                  isDateBooked(date) ? "booked-date" : undefined
                }
                timeClassName={(time) =>
                  isTimeBooked(time) ? "booked-time" : undefined
                }
              />
            </div>

            <div className="items">
              <label htmlFor="serviceOffered">Service Offered</label>
              <select
                id="serviceOffered"
                value={formData.serviceOffered}
                onChange={handleInputChange}
              >
                <option value="select">Select</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Deworming">Deworming</option>
                <option value="Grooming">Grooming</option>
                <option value="Surgery">Surgery</option>
                <option value="Consultation">Consultation</option>
                <option value="Treatment">Treatment</option>
                <option value="Confinement">Confinement</option>
                <option value="Pet Boarding">Pet Boarding</option>
                <option value="Laboratory">Laboratory</option>
              </select>
            </div>
            <button className="btn-submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
      {statusShow && (
        <div className="appointment-main-status">
          <div className="appointment-con-status">
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
      {listServiceShow && (
        <div className="list-service-main">
          <UserService />
        </div>
      )}
      <img className="buttom-style" src={Style} alt="rotate" />
      {selectedAppointmentId && !userChatClose && (
        <div className="user-chat-container">
          <RiCloseCircleFill
            size={30}
            onClick={toggleUserChatClose}
            className="user-chat-close"
            color="white"
          />
          <Chat
            appointmentId={selectedAppointmentId}
            onMessageSend={() => console.log("Message sent!")}
          />
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
