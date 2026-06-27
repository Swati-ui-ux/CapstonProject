import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux"

const OwnersList = () => {
  const darkMode = useSelector(
  (state) => state.theme.darkMode
);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwners();
  }, []);

  const getOwners = async () => {
    try {
      const response = await axiosInstance.get("/users/owners");
      setOwners(response.data.owners);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    className={`min-h-screen p-6 transition-all duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900"
        : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100"
    }`}
  >
    {/* Heading */}

    <div className="text-center mb-10">
      <h1
        className={`text-5xl font-bold ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        🏠 Property Owners
      </h1>

      <p
        className={`mt-3 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Browse all owners and their available properties.
      </p>
    </div>

    <div className="space-y-10">

      {owners.map((owner) => (
        <div
          key={owner.id}
          className={`rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
            darkMode
              ? "bg-white/10 backdrop-blur-xl border border-slate-700 shadow-2xl"
              : "bg-white shadow-2xl"
          }`}
        >
          {/* Owner */}

          <div className="p-8">

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-300/20 pb-6">

              <img
                src={owner.image}
                alt={owner.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />

              <div className="flex-1">

                <h2
                  className={`text-3xl font-bold ${
                    darkMode
                      ? "text-gray-100"
                      : "text-gray-900"
                  }`}
                >
                  {owner.name}
                </h2>

                <p
                  className={`mt-2 ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  📧 {owner.email}
                </p>

                <p
                  className={`${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  📱 {owner.phone || "Not Available"}
                </p>

                <span className="inline-block mt-4 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold">
                  {owner.Properties?.length || 0} Properties
                </span>

              </div>

            </div>

            {/* Properties */}

            <h3
              className={`text-2xl font-bold mt-8 mb-6 ${
                darkMode
                  ? "text-gray-100"
                  : "text-gray-900"
              }`}
            >
              Properties
            </h3>

            {owner.Properties?.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {owner.Properties.map((property) => (
                  <div
                    key={property.id}
                    className={`rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] ${
                      darkMode
                        ? "bg-slate-800 border border-slate-700"
                        : "bg-gray-50 shadow-lg"
                    }`}
                  >
                    <img
                      src={property.image}
                      alt={property.propertyName}
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-5">

                      <h4
                        className={`text-xl font-bold ${
                          darkMode
                            ? "text-gray-100"
                            : "text-gray-900"
                        }`}
                      >
                        {property.propertyName}
                      </h4>

                      <p
                        className={`mt-3 ${
                          darkMode
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        📍 {property.location}
                      </p>

                      <p
                        className={`mt-3 text-sm leading-6 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {property.description}
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <div
                className={`rounded-2xl p-10 text-center ${
                  darkMode
                    ? "bg-slate-800 border border-slate-700 text-gray-400"
                    : "bg-gray-50 border border-gray-200 text-gray-500"
                }`}
              >
                <div className="text-5xl mb-4">🏘️</div>

                <p className="text-lg">
                  No properties added yet.
                </p>
              </div>
            )}

          </div>

        </div>
      ))}

    </div>
  </div>
);
};

export default OwnersList;