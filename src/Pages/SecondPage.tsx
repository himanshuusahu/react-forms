import { useState, useEffect } from 'react';
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ParentDept from './ParentDept';
interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    if (!userDetailsString) {
      navigate('/', { replace: true });
      alert('You have been redirected to the homepage as you have not entered the details!');
    } else {
      const userDetails = JSON.parse(userDetailsString);
      if (!userDetails || !userDetails.name || !userDetails.phone || !userDetails.email) {
        navigate('/', { replace: true });
        alert('You have been redirected to the homepage!');
      } else {
        axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            setPosts(response.data.slice(0, 10));
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }, []);

  const columns : GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', flex: 0.2 },
    { field: 'title', headerName: 'Title', type: 'string', flex: 0.4 },
    { field: 'body', headerName: 'Body', type: 'string', flex: 0.4 },
  ];

  return (
    <>
    <div className="mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-2xl font-bold mb-4">Second Page</h1>
      <div className="overflow-x-auto">
        <DataGrid
          rows={posts}
          columns={columns}
          className="bg-white shadow-md rounded"
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              fontSize: 14,
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              fontSize: 14,
            },
          }}
        />
      </div>
    </div>
    <div>
      <ParentDept></ParentDept>
    </div>
    </>
  );
};

export default SecondPage;