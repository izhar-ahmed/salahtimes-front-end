import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './MasjidTable.css'
import { Link, useNavigate } from 'react-router-dom';





const MasjidTable = () => {
	const [masjidData, setMasjidData] = useState([])

	const navigate = useNavigate();	

	// use effect call
	useEffect(() => {
		const getAllMasjid = "http://localhost:8080/api/masjid";
	
		const fetchData = async () => {
			await fetchMasjidData();
		};
	
		fetchData();  // Invoke the async function
	
	}, []);

// fetch all masjid data and set state
const fetchMasjidData = async () => {
  const getAllMasjid = "http://localhost:8080/api/masjid";

  try {
    const response = await axios.get(getAllMasjid);
    setMasjidData(response.data.masjidWithNamazIds);
  } catch (error) {
    console.error("Error fetching masjids:", error);
  }
};

	const columns = [
		{
			name: 'Masjid',
			selector: row => row.masjidName,
			sortable: true
		},
		{
			name: 'Area',
			selector: row => row.masjidArea,
			sortable: true
		},
		{
			name: 'Masjid Address',
			selector: row => row.masjidAddress,
			sortable: true
		},
		{
			name: 'Action',
			cell: (row) => (
				<>
					{row.ids.length === 1 ? (
						<>
							<button className='mr-3' onClick={() => { addMasjidTimeTable(row.masjidId) }}>Add Timetable</button>
							<button className='mr-3' onClick={() => { editMasjid(row.masjidId) }}>Edit</button>
							<button className='mr-3' onClick={() => { deleteMasjid(row.masjidId) }}>Delete</button>
							<button className='mr-3' onClick={() => { viewMasjid(row.masjidId) }}>View</button>
						</>
					) : (
						<>
							<button className='mr-3' onClick={() => { editMasjidTimeTable(row.masjidId) }}>Edit Timetable</button>
							<button className='mr-3' onClick={() => { editMasjid(row.masjidId) }}>Edit</button>
							<button className='mr-3' onClick={() => { deleteMasjid(row.masjidId) }}>Delete</button>
							<button className='mr-3' onClick={() => { viewMasjid(row.masjidId) }}>View</button>
						</>
					)}
				</>
			),
			ignoreRowClick: true,
			button: true,
			width: '300px',
		},
	];
	
	const editMasjid = (masjidId) => {
		console.log(`Edit Masjid: `, masjidId);
		navigate(`/dashboard/masjid/edit-masjid/${masjidId}`);
	}
	const deleteMasjid = async (masjidId) => {
		try {
			const token = localStorage.getItem('token');
			const deleteApi = `http://localhost:8080/api/masjid/${masjidId}`;
	
			// Make the DELETE request
			const response = await axios.delete(deleteApi, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
	
			// Handle the response as needed
			 await fetchMasjidData();
			
			navigate('/dashboard/masjid');
		} catch (error) {
			// Handle errors
			console.error('Error deleting data:', error);
		}
	}
	const viewMasjid = (masjidId) => {
		console.log(`view Masjid: `, masjidId);
		navigate(`/dashboard/masjid/view-masjid/${masjidId}`);
	}
	const editMasjidTimeTable = (masjidId) => {
		console.log(`Edit Masjid TimeTable: `, masjidId)
	}
	const addMasjidTimeTable = (masjidId) => {
		console.log(`Add Masjid TimeTable: `, masjidId)
		navigate(`/dashboard/masjid/add-timetable/${masjidId}`);
	}

	


	return (
		<>
			<Link type='button' to='/dashboard/masjid/add-masjid' class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Masjid</Link>
			<DataTable
				title="Masjid Table"
				columns={columns}
				data={masjidData}
				pagination
				highlightOnHover
				responsive

			/>
		</>
	);
}

export default MasjidTable;