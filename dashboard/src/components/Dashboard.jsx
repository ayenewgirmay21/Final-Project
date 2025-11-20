import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://mediserve-final-project.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data?.appointments || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        toast.error("Failed to fetch appointments.");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `https://mediserve-final-project.onrender.com/api/v1/appointment/update/${id}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? { ...appt, status } : appt))
      );
      toast.success(data?.message || "Status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (loading) return <p>Loading dashboard...</p>;

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>
                {admin?.firstName && admin?.lastName
                  ? `${admin.firstName} ${admin.lastName}`
                  : "Admin"}
              </h5>
            </div>
            <p>
              The Admin Dashboard is a centralized control panel that provides
              administrators with a comprehensive overview of the system.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>10</h3>
        </div>
      </div>

      <div className="banner">
        <h5>Appointments</h5>
        {appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td>
                    {appt?.patient
                      ? `${appt.patient.firstName} ${appt.patient.lastName}`
                      : "Unknown"}
                  </td>
                  <td>
                    {appt?.appointment_date
                      ? appt.appointment_date.substring(0, 16)
                      : "N/A"}
                  </td>
                  <td>
                    {appt?.doctor
                      ? `${appt.doctor.firstName} ${appt.doctor.lastName}`
                      : "Unknown"}
                  </td>
                  <td>{appt?.department || "N/A"}</td>
                  <td>
                    <select
                      value={appt?.status || "Pending"}
                      onChange={(e) =>
                        handleUpdateStatus(appt._id, e.target.value)
                      }
                      className={
                        appt?.status === "Pending"
                          ? "value-pending"
                          : appt?.status === "Accepted"
                          ? "value-accepted"
                          : "value-rejected"
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    {appt?.hasVisited ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
