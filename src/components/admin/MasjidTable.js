import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './MasjidTable.css'
import { Link, useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const MasjidTable = () => {
	const [masjidData, setMasjidData] = useState([])
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [deleteMasjidId, setDeleteMasjidId] = useState(null);

	const navigate = useNavigate();

	// use effect call
	useEffect(() => {

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
							<button className='mr-3' onClick={() => { handleDeleteClick(row.masjidId) }}>Delete</button>
							<button className='mr-3' onClick={() => { viewMasjid(row.masjidId) }}>View</button>
						</>
					) : (
						<>
							<button className='mr-3' onClick={() => { editMasjidTimeTable(row.masjidId) }}>Edit Timetable</button>
							<button className='mr-3' onClick={() => { editMasjid(row.masjidId) }}>Edit</button>
							<button className='mr-3' onClick={() => { handleDeleteClick(row.masjidId) }}>Delete</button>
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
		navigate(`/m-admin/masjid/edit-masjid/${masjidId}`);
	}

	// handle delete click
	const handleDeleteClick = (masjidId) => {
		setDeleteMasjidId(masjidId);
		setPopupVisible(true);
	};

	// handle cancel delete
	const handleCancelDelete = () => {
		// Close the popup and reset deleteItemId
		console.log("cancel handle clicked")
		setPopupVisible(false);
		setDeleteMasjidId(null);
	};

	const handleConfirmDelete = async () => {
		try {
			const token = localStorage.getItem('token');
			const deleteApi = `http://localhost:8080/api/masjid/${deleteMasjidId}`;

			// Make the DELETE request
			const response = await axios.delete(deleteApi, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			// Handle the response as needed
			await fetchMasjidData();
			setPopupVisible(false);
			setDeleteMasjidId(null);
			navigate('/m-admin/masjid');
		} catch (error) {
			// Handle errors
			console.error('Error deleting data:', error);
		}
	}
	const viewMasjid = (masjidId) => {
		console.log(`view Masjid: `, masjidId);
		navigate(`/m-admin/masjid/view-masjid/${masjidId}`);
	}
	const editMasjidTimeTable = (masjidId) => {
		console.log(`Edit Masjid TimeTable: `, masjidId)
		navigate(`/m-admin/masjid/edit-timetable/${masjidId}`);
	}
	const addMasjidTimeTable = (masjidId) => {
		console.log(`Add Masjid TimeTable: `, masjidId)
		navigate(`/m-admin/masjid/add-timetable/${masjidId}`);
	}




	return (
		<>
			<Link type='button' to='/m-admin/masjid/add-masjid' className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Masjid</Link>
			<DataTable
				title="Masjid Table"
				columns={columns}
				data={masjidData}
				pagination
				highlightOnHover
				responsive
			/>
			{/* Popup */}
			{isPopupVisible && (
				<DeleteConfirmation onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
			)}
		</>
	);
}

export default MasjidTable;