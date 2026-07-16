import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import {
  MdOutlineAddAPhoto,
  MdEdit,
  MdOutlineLockReset,
  MdAdd,
  MdDeleteOutline,
  MdHome,
  MdWork,
  MdPlace,
  MdStarRate,
  MdOutlineStarBorder,
} from "react-icons/md";
import PasswordChangeModal from "../commonModals/PasswordChangeModal.jsx";

const ADDRESS_TYPE_ICONS = {
  home: MdHome,
  work: MdWork,
  other: MdPlace,
};

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-700",
  verified: "bg-green-500/10 text-green-700",
  suspended: "bg-red-500/10 text-red-700",
};

const getEmptyAddress = () => ({
  name: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  country: "",
  addressType: "home",
  isDefault: false,
  geoLat: "",
  geoLon: "",
});

const CustomerSettings = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [isEditable, setIsEditable] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePreview] = useState(null);
  const [isPasswordChangeModelOpen, setIsPasswordChangeModelOpen] =
    useState(false);

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

  // ---------------------------------------------------------------------
  // Customer document (addressBook, isActive, status)
  // ---------------------------------------------------------------------
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [loadingCustomerError, setLoadingCustomerError] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  const fetchCustomerData = async () => {
    try {
      setIsLoadingCustomer(true);

      const res = await api.get(`/customer/get-customer-data?id=${user._id}`);
      setCustomerData(res.data.data);
      setAddresses(res.data.data?.addressBook || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching customer. Please try again.",
      );
      setLoadingCustomerError(
        error.response?.data?.message ||
          "Unknown error occurred fetching customer. Please try again.",
      );
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  useEffect(() => {
    // fetchCustomerData();
  }, [user]);

  // ---------------------------------------------------------------------
  // Address Book handlers
  // ---------------------------------------------------------------------
  const [addresses, setAddresses] = useState([]);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null); // null | number | "new"
  const [addressFormData, setAddressFormData] = useState(getEmptyAddress());
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const startAddAddress = () => {
    setAddressFormData(getEmptyAddress());
    setEditingAddressIndex("new");
  };

  const startEditAddress = (index) => {
    const addr = addresses[index];
    setAddressFormData({
      name: addr.name || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      pinCode: addr.pinCode || "",
      country: addr.country || "",
      addressType: addr.addressType || "home",
      isDefault: addr.isDefault || false,
      geoLat: addr.geolocation?.lat || "",
      geoLon: addr.geolocation?.lon || "",
    });
    setEditingAddressIndex(index);
  };

  const handleCancelAddress = () => {
    setEditingAddressIndex(null);
    setAddressFormData(getEmptyAddress());
  };

  const handleSaveAddress = async () => {
    try {
      setIsSavingAddress(true);

      const newAddress = {
        name: addressFormData.name,
        address: addressFormData.address,
        city: addressFormData.city,
        state: addressFormData.state,
        pinCode: addressFormData.pinCode,
        country: addressFormData.country,
        addressType: addressFormData.addressType,
        isDefault: addressFormData.isDefault,
        geolocation: {
          lat: addressFormData.geoLat,
          lon: addressFormData.geoLon,
        },
      };

      // TODO: wire up API call, e.g.
      // const response = await api.put(`/customer/address-book`, {
      //   addressBook:
      //     editingAddressIndex === "new"
      //       ? [...addresses, newAddress]
      //       : addresses.map((a, i) => (i === editingAddressIndex ? newAddress : a)),
      // });
      console.log("newAddress", newAddress);

      setAddresses((prev) => {
        let updated =
          editingAddressIndex === "new"
            ? [...prev, newAddress]
            : prev.map((addr, i) =>
                i === editingAddressIndex ? newAddress : addr,
              );

        // Only one address can be default at a time
        if (newAddress.isDefault) {
          const defaultIndex =
            editingAddressIndex === "new"
              ? updated.length - 1
              : editingAddressIndex;
          updated = updated.map((addr, i) => ({
            ...addr,
            isDefault: i === defaultIndex,
          }));
        }

        return updated;
      });

      toast.success(
        editingAddressIndex === "new"
          ? "Address added successfully!"
          : "Address updated successfully!",
      );
      setEditingAddressIndex(null);
      setAddressFormData(getEmptyAddress());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleDeleteAddress = (index) => {
    // TODO: wire up API call, e.g.
    // await api.delete(`/customer/address-book/${index}`);
    setAddresses((prev) => prev.filter((_, i) => i !== index));
    toast.success("Address removed");
  };

  const handleSetDefaultAddress = (index) => {
    // TODO: wire up API call to persist default change
    setAddresses((prev) =>
      prev.map((addr, i) => ({ ...addr, isDefault: i === index })),
    );
  };

  const renderAddressForm = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full">
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. John's Home"
            value={addressFormData.name}
            onChange={handleAddressFormChange}
            required
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold mb-2">
            Address Type
          </label>
          <select
            name="addressType"
            value={addressFormData.addressType}
            onChange={handleAddressFormChange}
            required
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="w-full flex items-end pb-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              name="isDefault"
              checked={addressFormData.isDefault}
              onChange={handleAddressFormChange}
              className="w-4 h-4 accent-(--color-primary)"
            />
            Set as default address
          </label>
        </div>

        <div className="w-full md:col-span-3">
          <label className="block text-sm font-semibold mb-2">Address</label>
          <textarea
            name="address"
            rows={2}
            value={addressFormData.address}
            onChange={handleAddressFormChange}
            required
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded resize-none"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold mb-2">City</label>
          <input
            type="text"
            name="city"
            value={addressFormData.city}
            onChange={handleAddressFormChange}
            required
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold mb-2">State</label>
          <input
            type="text"
            name="state"
            value={addressFormData.state}
            onChange={handleAddressFormChange}
            required
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
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
            onChange={handleAddressFormChange}
            required
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={addressFormData.country}
            onChange={handleAddressFormChange}
            required
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold mb-2">
            Latitude{" "}
            <span className="font-normal text-(--color-secondary)">
              (optional)
            </span>
          </label>
          <input
            type="text"
            name="geoLat"
            value={addressFormData.geoLat}
            onChange={handleAddressFormChange}
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold mb-2">
            Longitude{" "}
            <span className="font-normal text-(--color-secondary)">
              (optional)
            </span>
          </label>
          <input
            type="text"
            name="geoLon"
            value={addressFormData.geoLon}
            onChange={handleAddressFormChange}
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={handleSaveAddress}
          className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
          disabled={isSavingAddress}
        >
          {isSavingAddress ? "Saving..." : "Save Address"}
        </button>
        <button
          onClick={handleCancelAddress}
          className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
          disabled={isSavingAddress}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="h-[90vh] flex flex-col gap-4 p-2 overflow-hidden">
        {/* Account Status - compact top strip */}
        <div className="shrink-0 bg-(--color-base-200) rounded-lg px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-semibold">Account Status</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-(--color-base-100)">
              <span
                className={`h-2 w-2 rounded-full ${customerData?.isActive !== false ? "bg-green-500" : "bg-(--color-secondary)"}`}
              />
              <span className="text-xs font-medium">
                {customerData?.isActive !== false ? "Active" : "Inactive"}
              </span>
            </div>

            <div
              className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[customerData?.status || "pending"]}`}
            >
              {customerData?.status || "pending"}
            </div>
          </div>
        </div>

        {/* User Profile Section - fixed height */}
        <div className="shrink-0 bg-(--color-base-200) rounded-lg p-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            {!isEditable ? (
              <div className=" flex gap-3">
                <button
                  onClick={() => setIsEditable(true)}
                  className=" flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm hover:bg-(--color-primary) hover:text-(--color-primary-content)"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => setIsPasswordChangeModelOpen(true)}
                  className=" flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm hover:bg-(--color-primary) hover:text-(--color-primary-content)"
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

          <div>
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
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) disabled:bg-(--secondary) cursor-not-allowed  rounded`}
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
        </div>

        {/* Address Book Section - fills remaining space, scrolls internally */}
        <div className="flex-1 min-h-0 flex flex-col bg-(--color-base-200) rounded-lg p-3">
          <div className="shrink-0 flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Address Book</h3>
            <button
              onClick={startAddAddress}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
              disabled={editingAddressIndex !== null}
            >
              <MdAdd /> Add Address
            </button>
          </div>

          {isLoadingCustomer ? (
            <div className="flex flex-col justify-center items-center h-32">
              <span className="text-sm text-(--color-primary) font-semibold animate-bounce">
                Fetching addresses...
              </span>
            </div>
          ) : loadingCustomerError ? (
            <div className="flex flex-col justify-center items-center h-32">
              <span className="text-sm text-(--color-error) font-semibold">
                {loadingCustomerError}
              </span>
            </div>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-3 pr-1">
              {addresses.length === 0 && editingAddressIndex !== "new" && (
                <div className="text-center py-8 text-(--color-secondary)">
                  <MdPlace className="text-3xl mx-auto mb-2" />
                  <p className="text-sm">No addresses added yet.</p>
                </div>
              )}

              {addresses.map((addr, index) => {
                const Icon = ADDRESS_TYPE_ICONS[addr.addressType] || MdPlace;

                return (
                  <div
                    key={index}
                    className="border border-(--color-secondary) rounded-lg p-3 bg-(--color-base-100)"
                  >
                    {editingAddressIndex === index ? (
                      renderAddressForm()
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                            <Icon className="text-lg" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold">
                                {addr.name}
                              </p>
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-(--color-secondary)/20 uppercase">
                                {addr.addressType}
                              </span>
                              {addr.isDefault && (
                                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                                  <MdStarRate /> Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm mt-1">{addr.address}</p>
                            <p className="text-xs text-(--color-secondary-content) mt-0.5">
                              {addr.city}, {addr.state} {addr.pinCode},{" "}
                              {addr.country}
                            </p>
                            {(addr.geolocation?.lat ||
                              addr.geolocation?.lon) && (
                              <p className="text-[11px] text-(--color-secondary) mt-0.5">
                                Lat: {addr.geolocation?.lat || "-"}, Lon:{" "}
                                {addr.geolocation?.lon || "-"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(index)}
                              title="Set as default"
                              className="flex items-center gap-1 border border-(--color-secondary) px-2 py-1 rounded text-xs"
                            >
                              <MdOutlineStarBorder /> Default
                            </button>
                          )}
                          <button
                            onClick={() => startEditAddress(index)}
                            className="flex items-center gap-1 bg-(--color-primary) text-(--color-primary-content) px-2 py-1 rounded text-xs"
                          >
                            <MdEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(index)}
                            className="flex items-center gap-1 bg-(--color-error) text-(--color-error-content) px-2 py-1 rounded text-xs"
                          >
                            <MdDeleteOutline /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {editingAddressIndex === "new" && (
                <div className="border border-(--color-secondary) rounded-lg p-3 bg-(--color-base-100)">
                  {renderAddressForm()}
                </div>
              )}
            </div>
          )}
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

export default CustomerSettings;