// frontend/src/pages/DoctorSelect.jsx
import React from "react";

export default function DoctorSelect({ doctors, value, onChange, disabled }) {
  return (
    <label>Doctor:
      <select required value={value} onChange={onChange} disabled={disabled}>
        <option value="">Select Doctor</option>
        {doctors.map(doc => (
          <option key={doc._id} value={doc._id}>
            {doc.name} {doc.specialization ? `- ${doc.specialization}` : ''}
          </option>
        ))}
      </select>
    </label>
  );
}
