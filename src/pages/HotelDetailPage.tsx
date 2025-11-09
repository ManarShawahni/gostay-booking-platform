import { useParams } from 'react-router-dom';

function HotelDetailPage() {
  const { hotelId } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800">Hotel Details</h1>
      <p className="mt-4 text-gray-600">Showing hotel ID: {hotelId}</p>
    </div>
  );
}

export default HotelDetailPage;