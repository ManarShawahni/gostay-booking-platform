import { useParams } from 'react-router-dom';

function ConfirmationPage() {
  const { bookingId } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Booking Confirmed! ✓
      </h1>
      <p className="text-xl text-gray-600">
        Confirmation Number: {bookingId}
      </p>
    </div>
  );
}

export default ConfirmationPage;