import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { addNamazTimeAPI } from "../../util/util";
import PropTypes from "prop-types";

const AddTimeTableForm = ({ masjidId }) => {
	const [namazTimeTable, setNamazTimeTable] = useState([
		{
			"masjidId": masjidId,
			"namazName": "FAJAR",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "ZOHAR",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "ASAR",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "MAGRIB",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "ISHA",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "JUMA",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		}
	]);

	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log(namazTimeTable);
		const response = await axios.post(addNamazTimeAPI, namazTimeTable, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
		if (response.status >= 200 && response.status <= 300) {
			console.log("Masjid time table form submitted successfully.");
			navigate('/m-admin/masjid');
		} else {
			console.log("Error occure when submitting form");
		}
	}

	const fieldValueUpdate = (e, idx, fieldName) => {
		console.log(e.target.value);
		const newNamazTimeTable = namazTimeTable;
		newNamazTimeTable[idx][fieldName] = e.target.value;
		setNamazTimeTable(newNamazTimeTable)
	}


	// useEffect(() => {
	// 	console.log('use effect')
	// 	// Get the details of the masjid
	// 	// Note for update form: Get the details of the masjid with NamazTimeTable
	// }, [])

	return (
		<>
			<div className="container mx-auto">
			<div style={{fontWeight: "400"}} className='evaFvq'>Add Namaz Time</div>
				<form className="bg-white shadow-md rounded-md p-6" onSubmit={submitHandler}>
					{namazTimeTable.map((timetable, idx) => (
						<div key={idx}>
							{/* Namaz Name and Azaan Time in one line */}
							<div className="flex justify-between mb-4 w-[50%]">
								<div className="mr-2 w-1/3">
									<label className="block text-sm font-semibold text-gray-600">
										Namaz Name
									</label>
									<div
										className="w-full block border rounded-md px-3 py-2 mt-1"
									>{namazTimeTable[idx].namazName}</div>
								</div>
								<div className="mr-2 w-1/3">
									<label className="block text-sm font-semibold text-gray-600">
										Azaan Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										onChange={(e) => fieldValueUpdate(e, idx, 'azaanTime')}
										// value={namazTimeTable[idx].azaanTime}
										required
									/>
								</div>
								<div className="mr-2 w-1/3">
									<label className="block text-sm font-semibold text-gray-600">
										Jamaat Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										onChange={(e) => fieldValueUpdate(e, idx, 'jamaatTime')}
										required
									/>
								</div>
								
							</div>
							<div className="flex mb-4 w-[50%]"> 
							<div className="mr-2 w-1/3">
									<label className="block text-sm font-semibold text-gray-600">
										Start Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										onChange={(e) => fieldValueUpdate(e, idx, 'startTime')}
									/>
								</div>
								<div className="mb-4 w-1/3">
									<label className="block text-sm font-semibold text-gray-600">
										End Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										onChange={(e) => fieldValueUpdate(e, idx, 'endTime')}
									/>
								</div>
							</div>
						</div>
					))}
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}

AddTimeTableForm.propTypes = {
	masjidId: PropTypes.string
}


export default AddTimeTableForm;