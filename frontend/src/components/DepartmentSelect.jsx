// DepartmentSelect.js
import React, { useEffect, useState } from 'react';

export default function DepartmentSelect({ value, onChange }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error('Error fetching departments:', err));
  }, []);

  return (
    <label>Department:
      <select required value={value} onChange={onChange}>
        <option value=''>Select department</option>
        {departments.length > 0
          ? departments.map(d => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))
          : <option disabled>Loading departments...</option>
        }
      </select>
    </label>
  );
}
