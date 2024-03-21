// MasjidData.js
import PropTypes from "prop-types";

const MasjidData = ({ masjid, namazTime, loading, error }) => {
  if (loading) {
    return (
      <div className="container mx-auto my-5 p-4 lg:p-0">
        <div className="text-left">
          <h1 className="text-2xl font-bold">Loading</h1>
        </div>
      </div>
    )
  }

  if (error) {
    <div className="container mx-auto my-5 p-4 lg:p-0">
      <div className="text-left">
        <h1 className="text-2xl font-bold">Error Loading data, please try again</h1>
      </div>
    </div>
  }

  return (
    <div className="container mx-auto my-5 p-4 lg:p-0">
      {namazTime.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Add namaz time table for this masjid</h1>
        </div>
      ) : (
        <div key={masjid.masjidId} className="mb-8 mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {namazTime.map((prayer) => (
              <div key={prayer.id} className={prayer.selected ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 p-4 rounded-md shadow-md border border-white-300 text-white selected" : "bg-white p-4 rounded-md shadow-md border border-gray-300"}>
                {prayer.selected ? <p>Upcoming Prayer</p> : ''}
                <p className="font-bold text-lg mb-2">{prayer.namazName}</p>
                <p className="text-sm">Azaan Time: {prayer.azaanTime}</p>
                <p className="text-sm">Jamaat Time: {prayer.jamaatTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

MasjidData.propTypes = {
  masjid: PropTypes.any,
  namazTime: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any
}

export default MasjidData;
