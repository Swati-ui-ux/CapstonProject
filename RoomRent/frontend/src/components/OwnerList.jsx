import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const OwnersList = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    getOwners();
  }, []);

  const getOwners = async () => {
    try {
      const response = await axiosInstance.get(
        "/users/owners"
      );

      setOwners(response.data.owners);
      console.log(response.data.owners);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Property Owners
      </h1>

      <div className="grid md:grid-cols-3 gap-5">
        {owners.map((owner) => (
          <div
            key={owner.id}
            className="bg-white p-5 rounded shadow"
          >
            <h2 className="font-bold text-xl">
              {owner.name}
            </h2>

            <p>{owner.email}</p>

            <h3 className="mt-3 font-semibold">
              Properties:
            </h3>

            {owner.Properties?.map((property) => (
              <div
                key={property.id}
                className="border p-2 rounded mt-2"
              >
                <p>
                  {property.propertyName}
                </p>

                <p>
                  {property.location}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnersList;