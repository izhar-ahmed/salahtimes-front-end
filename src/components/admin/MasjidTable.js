import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './MasjidTable.css'
import { Link, useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';
import { PlusIcon } from '@heroicons/react/24/solid';

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
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1' onClick={() => { addMasjidTimeTable(row.masjidId) }}>Add Timetable</button>
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1' onClick={() => { editMasjid(row.masjidId) }}>Edit</button>
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1' onClick={() => { handleDeleteClick(row.masjidId) }}>Delete</button>
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => { viewMasjid(row.masjidId) }}>View</button>
						</>
					) : (
						<>
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1' onClick={() => { editMasjidTimeTable(row.masjidId) }}>Edit Timetable</button>
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1' onClick={() => { editMasjid(row.masjidId) }}>Edit</button>
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1' onClick={() => { handleDeleteClick(row.masjidId) }}>Delete</button>
							<button className='px-5 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => { viewMasjid(row.masjidId) }}>View</button>
						</>
					)}
				</>
			),
			ignoreRowClick: true,
			button: true,
			width: '400px',
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
			await axios.delete(deleteApi, {
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
		<div>
			<Link type='button' to='/m-admin/masjid/add-masjid' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
				<PlusIcon className='h-5 w-5 text-white-500 inline pb-1' />
				Add Masjid
			</Link>
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
		</div>
	);
}

export default MasjidTable;

// API key : AIzaSyDWDpwOmj_So3TeKKeZYVBf8aUIsBboShE