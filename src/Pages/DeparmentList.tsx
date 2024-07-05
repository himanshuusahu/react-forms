import React, { useState } from 'react';

type Department = {
  department: string;
  sub_departments: string[];
};

type DepartmentListProps = {
  departments: Department[];
  onDepartmentSelect: (department: string) => void;
};

const DepartmentList: React.FC<DepartmentListProps> = ({ departments, onDepartmentSelect }) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // Function to handle expanding/collapsing departments
  const handleExpandClick = (department: string) => {
    if (expanded.includes(department)) {
      setExpanded(expanded.filter((name) => name !== department));
    } else {
      setExpanded([...expanded, department]);
    }
  };

  // Function to select all sub-departments of a department
  const selectAllSubDepartments = (department: Department) => {
    const allSubDepartments = department.sub_departments.filter(subDept => !selectedDepartments.includes(subDept));
    setSelectedDepartments([...selectedDepartments, ...allSubDepartments]);
  };

  // Function to handle selecting departments and sub-departments
  const handleDepartmentClick = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      const index = selectedDepartments.indexOf(subDepartment);
      if (index === -1) {
        setSelectedDepartments([...selectedDepartments, subDepartment]);
      } else {
        setSelectedDepartments(selectedDepartments.filter((dept) => dept !== subDepartment));
      }
    } else {
      const index = selectedDepartments.indexOf(department);
      if (index === -1) {
        setSelectedDepartments([...selectedDepartments, department]);
        // Select all sub-departments of the selected department
        const selectedDept = departments.find(dep => dep.department === department);
        if (selectedDept) {
          selectAllSubDepartments(selectedDept);
        }
      } else {
        setSelectedDepartments(selectedDepartments.filter((dept) => dept !== department));
      }
    }
    onDepartmentSelect(subDepartment || department);
  };

  // Function to check if all sub-departments of a department are selected
  const areAllSubDepartmentsSelected = (department: Department) => {
    return department.sub_departments.every((subDept) => selectedDepartments.includes(subDept));
  };

  // Function to check if a department is selected
  const isDepartmentSelected = (department: string) => {
    return selectedDepartments.includes(department);
  };

  // Render function for each department
  const renderDepartment = (department: Department) => {
    const handleExpandClickLocal = () => {
      handleExpandClick(department.department);
    };

    // Render sub-departments
    const renderSubDepartments = () => {
      return department.sub_departments.map((subDepartment) => (
        <li key={subDepartment} className="pl-4">
          <input
            type="checkbox"
            checked={selectedDepartments.includes(subDepartment)}
            onChange={() => handleDepartmentClick(department.department, subDepartment)}
          />
          <span className="ml-2">{subDepartment}</span>
        </li>
      ));
    };

    return (
      <li key={department.department} className="py-4 pl-4 pr-2">
        <input
          type="checkbox"
          checked={isDepartmentSelected(department.department) || areAllSubDepartmentsSelected(department)}
          onChange={() => handleDepartmentClick(department.department)}
        />
        <span className="ml-2">{department.department}</span>
        {department.sub_departments.length > 0 && (
          <button
            onClick={handleExpandClickLocal}
           
          >Button
            {expanded.includes(department.department) ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7 7-7" />
              </svg>
            )}
          </button>
        )}
        {department.sub_departments.length > 0 && (
          <ul className={`pl-4 ${expanded.includes(department.department) ? '' : 'hidden'}`}>
            {renderSubDepartments()}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="list-none mb-0">
      {departments.map((department) => renderDepartment(department))}
    </ul>
  );
};

export default DepartmentList;
