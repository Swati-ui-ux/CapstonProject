import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwners();
  }, []);

  const getOwners = async () => {
    try {
      console.log("data fetching")
      const response = await axiosInstance.get("/users/owners");
      console.log("data fetched...",response.data)
      setOwners(response.data.owners);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 p-6">
  <h1 className="text-3xl font-bold mb-6">
    Property Owners
  </h1>

  <div className="space-y-8">
    {owners.map((owner) => (
      <div
        key={owner.id}
        className="bg-white rounded-xl shadow-md p-6"
      >
        {/* Owner Info */}
        <div className="flex items-center gap-4 border-b pb-3 mb-4">
          <img
            src={owner.image}
            alt={owner.name}
            className="w-14 h-14 rounded-full object-cover border"
          />

          <div>
           <h2 className="text-lg font-bold">
            {owner.name}
        </h2>

        <p className="text-sm text-gray-600">
          📧 {owner.email}
        </p>

        <p className="text-sm text-gray-600">
          📱 {owner.phone || "Not Available"}
        </p>

            <p className="text-sm text-gray-500 mt-1">
              Total Properties:
              {" "}
              {owner.Properties?.length || 0}
            </p>
          </div>
        </div>

        {/* Properties */}
        <h3 className="text-xl font-semibold mb-4">
          Properties
        </h3>

        {owner.Properties?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {owner.Properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition"
              >
                <img
                  src={property.image}
                  alt={property.propertyName}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                />

                <h4 className="font-bold text-lg">
                  {property.propertyName}
                </h4>

                <p className="text-gray-600">
                  📍 {property.location}
                </p>

               <p className="text-sm text-gray-500 mt-1 truncate">
                {property.description}
              </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border rounded-lg p-6 text-center text-gray-500">
            No properties added yet.
          </div>
        )}
      </div>
    ))}
  </div>
</div>
  );
};

export default OwnersList;