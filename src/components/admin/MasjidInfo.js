import axios from "axios";
import { useEffect, useState } from "react";

const MasjidInfo = ({ masjidId }) => {
	const [masjid, setMasjid] = useState({});
	const [namazTime, setNamazTime] = useState([]);
	const imgUrl = 'http://localhost:8080/uploads/';

	useEffect(() => {
		const masjidApi = `http://localhost:8080/api/masjid/${masjidId}`;
		const namazTimeApi = `http://localhost:8080/api/namaz-time/${masjidId}`
		axios.get(masjidApi)
			.then((response) => {
				setMasjid(response.data.masjid);
			})
			.catch((error) => {
				console.log(error);
				console.log("error while getting masjid");
			})


		axios.get(namazTimeApi)
			.then((response) => {
				setNamazTime(response.data.namazTimeTable);
			})
			.catch((error) => {
				console.log(error);
				console.log("error while getting masjid");
			})
	}, [])
	console.log(namazTime.length)
	return (
		<>
			<div className="flex justify-center items-center">
				<div className="max-w-md p-6 bg-white shadow-md rounded-md">
					<img src={imgUrl + masjid.masjidPhoto} alt={masjid.masjidName} className="mb-4 w-full h-40 object-cover rounded-md" />
					<h2 className="text-2xl font-bold mb-2 text-center">{masjid.masjidName}</h2>
					<p className="text-gray-600 mb-2 text-center">{masjid.masjidArea}</p>
					<p className="text-gray-600 mb-4 text-center	">{masjid.masjidAddress}</p>
				</div>
			</div>
			<div className="container mx-auto flex justify-center">
				{namazTime.length === 0 ? <h1 className="text-center text-3xl">Add Namaz Time Table For This Masjid</h1> : (
					<div className="grid grid-cols-3 gap-4 w-[80%]">
					{namazTime.map((nt) => (
						<div className="text-center">
							<h3 className="text-lg font-semibold mb-2">{nt.namazName}</h3>
							<p>Azaan: {nt.azaanTime}</p>
							<p>Jamaat: {nt.jamaatTime}</p>
						</div>
					))}


				</div>
				)}
				
			</div>
		</>

	);
}

export default MasjidInfo;