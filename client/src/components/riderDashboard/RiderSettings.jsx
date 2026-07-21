import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import {
  MdOutlineAddAPhoto,
  MdEdit,
  MdOutlineLockReset,
  MdPerson,
  MdDirectionsCar,
  MdDescription,
  MdPlace,
  MdAccountBalance,
  MdStar,
  MdCheckCircle,
  MdCancel,
  MdCloudUpload,
  MdMyLocation,
} from "react-icons/md";
import PasswordChangeModal from "../commonModals/PasswordChangeModal.jsx";

const STATUS_STYLES = {
  active: "bg-green-500/10 text-green-700",
  inactive: "bg-yellow-500/10 text-yellow-700",
  blocked: "bg-red-500/10 text-red-700",
};

const NAV_ITEMS = [
  { id: "profile", label: "Profile", icon: MdPerson },
  { id: "vehicle", label: "Vehicle Details", icon: MdDirectionsCar },
  { id: "documents", label: "Documents", icon: MdDescription },
  { id: "address", label: "Current Address", icon: MdPlace },
  { id: "financial", label: "Financial Details", icon: MdAccountBalance },
];

const DOCUMENT_FIELDS = [
  { key: "drivingLicense", label: "Driving License" },
  { key: "vehicleRegistrationCertificate", label: "Vehicle Registration (RC)" },
  { key: "insuranceCertificate", label: "Insurance Certificate" },
  { key: "aadharCard", label: "Aadhar Card" },
  { key: "panCard", label: "PAN Card" },
];

const RiderSettings = () => {
  const { user, setUser } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [isPasswordChangeModelOpen, setIsPasswordChangeModelOpen] =
    useState(false);

  // -----------------------------------------------------------------------
  // Rider document (top-level: status, rating, availability, location)
  // -----------------------------------------------------------------------
  const [isLoadingRider, setIsLoadingRider] = useState(false);
  const [loadingRiderError, setLoadingRiderError] = useState(null);
  const [riderData, setRiderData] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const fetchRiderData = async () => {
    try {
      setIsLoadingRider(true);
      const res = await api.get(`/rider/get-rider-data?id=${user._id}`);
      setRiderData(res.data.data);
      setIsAvailable(res.data.data?.isAvailable || false);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unknown error occurred fetching rider data. Please try again.";
      toast.error(message);
      setLoadingRiderError(message);
    } finally {
      setIsLoadingRider(false);
    }
  };

  useEffect(() => {
    // fetchRiderData();
  }, [user]);

  const handleToggleAvailability = async () => {
    const next = !isAvailable;
    setIsAvailable(next);
    try {
      // TODO: wire up API call, e.g.
      // await api.put(`/rider/availability`, { isAvailable: next });
      console.log("isAvailable", next);
    } catch (error) {
      setIsAvailable(!next);
      toast.error("Failed to update availability");
    }
  };

  // -----------------------------------------------------------------------
  // Profile
  // -----------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const payload = new FormData();
      payload.append("fullname", formData.fullname);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);
      payload.append("displayPic", profilePic);

      const response = await api.put(`/common/edit-profile`, payload);
      const updatedUser = response.data.data;
      setUser(updatedUser);
      sessionStorage.setItem("cravingUser", JSON.stringify(updatedUser));

      setIsEditable(false);
      toast.success("Profile updated sucessfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    });
    setProfilePreview(null);
    setIsEditable(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePreview(URL.createObjectURL(file));
    setProfilePic(file);
  };

  // -----------------------------------------------------------------------
  // Vehicle Details
  // -----------------------------------------------------------------------
  const [isVehicleEditable, setIsVehicleEditable] = useState(false);
  const [isSavingVehicle, setIsSavingVehicle] = useState(false);
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicleType: riderData?.vehicleDetails?.vehicleType || "",
    vehicleNumber: riderData?.vehicleDetails?.vehicleNumber || "",
    vehicleModel: riderData?.vehicleDetails?.vehicleModel || "",
    vehicleColor: riderData?.vehicleDetails?.vehicleColor || "",
  });

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveVehicle = async () => {
    try {
      setIsSavingVehicle(true);
      // TODO: wire up API call, e.g.
      // await api.put(`/rider/vehicle-details`, vehicleFormData);
      console.log("vehicleFormData", vehicleFormData);
      toast.success("Vehicle details updated successfully!");
      setIsVehicleEditable(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update vehicle details",
      );
    } finally {
      setIsSavingVehicle(false);
    }
  };

  const handleCancelVehicle = () => {
    setVehicleFormData({
      vehicleType: riderData?.vehicleDetails?.vehicleType || "",
      vehicleNumber: riderData?.vehicleDetails?.vehicleNumber || "",
      vehicleModel: riderData?.vehicleDetails?.vehicleModel || "",
      vehicleColor: riderData?.vehicleDetails?.vehicleColor || "",
    });
    setIsVehicleEditable(false);
  };

  // -----------------------------------------------------------------------
  // Documents
  // -----------------------------------------------------------------------
  const [documentFiles, setDocumentFiles] = useState({});
  const [existingDocuments, setExistingDocuments] = useState(
    riderData?.documents || {},
  );
  const [isSavingDocuments, setIsSavingDocuments] = useState(false);

  const handleDocumentChange = (key, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocumentFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSaveDocuments = async () => {
    try {
      setIsSavingDocuments(true);
      const payload = new FormData();
      Object.entries(documentFiles).forEach(([key, file]) => {
        payload.append(key, file);
      });

      // TODO: wire up API call, e.g.
      // await api.put(`/rider/documents`, payload);
      console.log("documentFiles", documentFiles);

      toast.success("Documents uploaded successfully!");
      setDocumentFiles({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to upload documents",
      );
    } finally {
      setIsSavingDocuments(false);
    }
  };

  // -----------------------------------------------------------------------
  // Current Address
  // -----------------------------------------------------------------------
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    address: riderData?.currentAddress?.address || "",
    city: riderData?.currentAddress?.city || "",
    state: riderData?.currentAddress?.state || "",
    pinCode: riderData?.currentAddress?.pinCode || "",
    country: riderData?.currentAddress?.country || "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    try {
      setIsSavingAddress(true);
      // TODO: wire up API call, e.g.
      // await api.put(`/rider/current-address`, addressFormData);
      console.log("addressFormData", addressFormData);
      toast.success("Address updated successfully!");
      setIsAddressEditable(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update address");
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleCancelAddress = () => {
    setAddressFormData({
      address: riderData?.currentAddress?.address || "",
      city: riderData?.currentAddress?.city || "",
      state: riderData?.currentAddress?.state || "",
      pinCode: riderData?.currentAddress?.pinCode || "",
      country: riderData?.currentAddress?.country || "",
    });
    setIsAddressEditable(false);
  };

  // -----------------------------------------------------------------------
  // Financial Details
  // -----------------------------------------------------------------------
  const [isFinancialEditable, setIsFinancialEditable] = useState(false);
  const [isSavingFinancial, setIsSavingFinancial] = useState(false);
  const [financialFormData, setFinancialFormData] = useState({
    bankName: riderData?.financialDetails?.bankName || "",
    accountNumber: riderData?.financialDetails?.accountNumber || "",
    ifscCode: riderData?.financialDetails?.ifscCode || "",
  });

  const handleFinancialChange = (e) => {
    const { name, value } = e.target;
    setFinancialFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFinancial = async () => {
    try {
      setIsSavingFinancial(true);
      // TODO: wire up API call, e.g.
      // await api.put(`/rider/financial-details`, financialFormData);
      console.log("financialFormData", financialFormData);
      toast.success("Financial details updated successfully!");
      setIsFinancialEditable(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update financial details",
      );
    } finally {
      setIsSavingFinancial(false);
    }
  };

  const handleCancelFinancial = () => {
    setFinancialFormData({
      bankName: riderData?.financialDetails?.bankName || "",
      accountNumber: riderData?.financialDetails?.accountNumber || "",
      ifscCode: riderData?.financialDetails?.ifscCode || "",
    });
    setIsFinancialEditable(false);
  };

  const maskedAccountNumber = financialFormData.accountNumber
    ? `••••••${financialFormData.accountNumber.slice(-4)}`
    : "";

  return (
    <>
      <div className="h-[88vh] flex flex-col gap-3 p-2 overflow-hidden">
        {/* Top status bar */}
        <div className="shrink-0 bg-(--color-base-200) rounded-lg px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <div
              className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[riderData?.status || "inactive"]}`}
            >
              {riderData?.status || "inactive"}
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-(--color-base-100) text-xs font-medium">
              <MdStar className="text-yellow-500" />
              {(riderData?.averageRating || 0).toFixed(1)}
            </div>

            {riderData?.currentLocation?.lat && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-(--color-base-100) text-xs text-(--color-secondary)">
                <MdMyLocation />
                {riderData.currentLocation.lat}, {riderData.currentLocation.lon}
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            {isAvailable ? "Available for rides" : "Currently offline"}
            <span
              onClick={handleToggleAvailability}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isAvailable ? "bg-(--color-primary)" : "bg-(--color-secondary)"}`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isAvailable ? "translate-x-5" : "translate-x-1"}`}
              />
            </span>
          </label>
        </div>

        {/* Sidebar + content */}
        <div className="flex-1 min-h-0 flex rounded-xl border border-(--color-secondary)/40 bg-(--color-base-100) overflow-hidden">
          {/* Sidebar nav */}
          <div className="w-52 shrink-0 border-r border-(--color-secondary)/30 bg-(--color-base-200) p-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition ${
                    active
                      ? "bg-(--color-primary) text-(--color-primary-content)"
                      : "hover:bg-(--color-base-100) text-(--color-secondary-content)"
                  }`}
                >
                  <Icon className="text-lg shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Content panel - no scroll, everything fixed/compact */}
          <div className="flex-1 overflow-hidden p-5">
            {isLoadingRider ? (
              <div className="flex flex-col justify-center items-center h-full">
                <span className="text-sm text-(--color-primary) font-semibold animate-bounce">
                  Fetching rider data...
                </span>
              </div>
            ) : loadingRiderError ? (
              <div className="flex flex-col justify-center items-center h-full">
                <span className="text-sm text-(--color-error) font-semibold">
                  {loadingRiderError}
                </span>
              </div>
            ) : (
              <>
                {/* Profile */}
                {activeSection === "profile" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-semibold">
                        Profile Information
                      </h3>
                      {!isEditable ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditable(true)}
                            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                          >
                            <MdEdit /> Edit
                          </button>
                          <button
                            onClick={() => setIsPasswordChangeModelOpen(true)}
                            className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                          >
                            <MdOutlineLockReset /> Change Password
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={handleSaveProfile}
                            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                            disabled={isLoading}
                          >
                            {isLoading ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                            disabled={isLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-20 h-20">
                          <img
                            src={profilePicPreview || user.photo.url}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover border-2 border-(--color-primary)"
                          />
                        </div>

                        {isEditable && (
                          <div
                            className="absolute cursor-pointer bottom-1 right-1 border p-2 rounded-full w-fit bg-(--color-base-200)"
                            title="Change Photo"
                          >
                            <label htmlFor="profilePic" className="cursor-pointer">
                              <MdOutlineAddAPhoto className="text-xl" />
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              name="profilePic"
                              id="profilePic"
                              className="hidden"
                              onChange={handleProfilePicChange}
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="w-full">
                            <label className="block text-sm font-semibold mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="fullname"
                              value={formData.fullname}
                              onChange={handleChange}
                              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                              disabled={!isEditable}
                            />
                          </div>

                          <div className="w-full">
                            <label className="block text-sm font-semibold mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-1.5 py-1 border border-(--color-secondary) disabled:bg-(--secondary) cursor-not-allowed rounded"
                              disabled
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                              disabled={!isEditable}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicle Details */}
                {activeSection === "vehicle" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-semibold">
                        Vehicle Details
                      </h3>
                      {!isVehicleEditable ? (
                        <button
                          onClick={() => setIsVehicleEditable(true)}
                          className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                        >
                          <MdEdit /> Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveVehicle}
                            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                            disabled={isSavingVehicle}
                          >
                            {isSavingVehicle ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            onClick={handleCancelVehicle}
                            className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                            disabled={isSavingVehicle}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Vehicle Type
                        </label>
                        <select
                          name="vehicleType"
                          value={vehicleFormData.vehicleType}
                          onChange={handleVehicleChange}
                          disabled={!isVehicleEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isVehicleEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        >
                          <option value="">Select type</option>
                          <option value="bike">Bike</option>
                          <option value="scooter">Scooter</option>
                          <option value="car">Car</option>
                          <option value="bicycle">Bicycle</option>
                        </select>
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Vehicle Number
                        </label>
                        <input
                          type="text"
                          name="vehicleNumber"
                          value={vehicleFormData.vehicleNumber}
                          onChange={handleVehicleChange}
                          disabled={!isVehicleEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isVehicleEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Vehicle Model
                        </label>
                        <input
                          type="text"
                          name="vehicleModel"
                          value={vehicleFormData.vehicleModel}
                          onChange={handleVehicleChange}
                          disabled={!isVehicleEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isVehicleEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Vehicle Color
                        </label>
                        <input
                          type="text"
                          name="vehicleColor"
                          value={vehicleFormData.vehicleColor}
                          onChange={handleVehicleChange}
                          disabled={!isVehicleEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isVehicleEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents */}
                {activeSection === "documents" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-semibold">Documents</h3>
                      <button
                        onClick={handleSaveDocuments}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                        disabled={
                          isSavingDocuments ||
                          Object.keys(documentFiles).length === 0
                        }
                      >
                        {isSavingDocuments ? "Uploading..." : "Save Documents"}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {DOCUMENT_FIELDS.map((doc) => {
                        const hasExisting = Boolean(
                          existingDocuments?.[doc.key],
                        );
                        const pendingFile = documentFiles[doc.key];

                        return (
                          <div
                            key={doc.key}
                            className="flex items-center justify-between gap-3 border border-(--color-secondary) rounded-lg px-3 py-2 bg-(--color-base-200)"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {pendingFile || hasExisting ? (
                                <MdCheckCircle className="text-green-600 text-lg shrink-0" />
                              ) : (
                                <MdCancel className="text-(--color-secondary) text-lg shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {doc.label}
                                </p>
                                <p className="text-xs text-(--color-secondary-content) truncate">
                                  {pendingFile
                                    ? pendingFile.name
                                    : hasExisting
                                      ? "Uploaded"
                                      : "Not uploaded"}
                                </p>
                              </div>
                            </div>

                            <label
                              htmlFor={`doc-${doc.key}`}
                              className="flex items-center gap-1 shrink-0 bg-(--color-primary) text-(--color-primary-content) px-2.5 py-1 rounded text-xs cursor-pointer"
                            >
                              <MdCloudUpload />
                              {hasExisting || pendingFile ? "Replace" : "Upload"}
                            </label>
                            <input
                              id={`doc-${doc.key}`}
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={(e) => handleDocumentChange(doc.key, e)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Current Address */}
                {activeSection === "address" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-semibold">
                        Current Address
                      </h3>
                      {!isAddressEditable ? (
                        <button
                          onClick={() => setIsAddressEditable(true)}
                          className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                        >
                          <MdEdit /> Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveAddress}
                            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                            disabled={isSavingAddress}
                          >
                            {isSavingAddress ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            onClick={handleCancelAddress}
                            className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                            disabled={isSavingAddress}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="w-full md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={addressFormData.address}
                          onChange={handleAddressChange}
                          disabled={!isAddressEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isAddressEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={addressFormData.city}
                          onChange={handleAddressChange}
                          disabled={!isAddressEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isAddressEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={addressFormData.state}
                          onChange={handleAddressChange}
                          disabled={!isAddressEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isAddressEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          name="pinCode"
                          value={addressFormData.pinCode}
                          onChange={handleAddressChange}
                          disabled={!isAddressEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isAddressEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={addressFormData.country}
                          onChange={handleAddressChange}
                          disabled={!isAddressEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isAddressEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Financial Details */}
                {activeSection === "financial" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-semibold">
                        Financial Details
                      </h3>
                      {!isFinancialEditable ? (
                        <button
                          onClick={() => setIsFinancialEditable(true)}
                          className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                        >
                          <MdEdit /> Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveFinancial}
                            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                            disabled={isSavingFinancial}
                          >
                            {isSavingFinancial ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            onClick={handleCancelFinancial}
                            className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                            disabled={isSavingFinancial}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          name="bankName"
                          value={financialFormData.bankName}
                          onChange={handleFinancialChange}
                          disabled={!isFinancialEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isFinancialEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          Account Number
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={
                            isFinancialEditable
                              ? financialFormData.accountNumber
                              : maskedAccountNumber
                          }
                          onChange={handleFinancialChange}
                          disabled={!isFinancialEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isFinancialEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-semibold mb-2">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          name="ifscCode"
                          value={financialFormData.ifscCode}
                          onChange={handleFinancialChange}
                          disabled={!isFinancialEditable}
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${isFinancialEditable ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded uppercase`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isPasswordChangeModelOpen && (
        <PasswordChangeModal
          open={isPasswordChangeModelOpen}
          onClose={() => setIsPasswordChangeModelOpen(false)}
        />
      )}
    </>
  );
};

export default RiderSettings;