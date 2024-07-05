import  { useState } from 'react';
import DepartmentList from './DeparmentList.tsx';
interface Department {
    department: string;
    sub_departments: string[];
  }
const departments: Department[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const ParentDept = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartments((prevDepartments) => [...prevDepartments, department]);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Department List</h1>
      <DepartmentList departments={departments} onDepartmentSelect={handleDepartmentSelect} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => console.log(selectedDepartments)}
      >
        Log Selected Departments
      </button>
    </div>
  );
};

export default ParentDept;