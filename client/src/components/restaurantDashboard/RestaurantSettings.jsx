import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto, MdEdit, MdOutlineLockReset } from "react-icons/md";
import PasswordChangeModal from "../commonModals/PasswordChangeModal.jsx";

const RestaurantSettings = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // ManagerProfile Handler
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

  // Restaurant Form Handler
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [restaurantData, setRestaurantData] = useState();
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [restaurantFormData, setRestaurantFormData] = useState({
    restaurantName: restaurantData?.restaurantName || "",
    address: restaurantData?.address || "",
    city: restaurantData?.city || "",
    state: restaurantData?.state || "",
    pinCode: restaurantData?.pinCode || "",
    country: restaurantData?.country || "",
    description: restaurantData?.description || "",
    restaurantType: restaurantData?.restaurantType || "",
    cuisineTypes: restaurantData?.cuisineTypes?.join(", ") || "",
    isOpen: restaurantData?.isOpen || false,
    contactEmail: restaurantData?.contactDetails?.email || "",
    contactPhone: restaurantData?.contactDetails?.phone || "",
    openingTime: restaurantData?.servingHours?.openingTime || "",
    closingTime: restaurantData?.servingHours?.closingTime || "",
    geoLat: restaurantData?.geoLocation?.lat || "",
    geoLon: restaurantData?.geoLocation?.lon || "",
    socialMediaLinks: restaurantData?.socialMediaLinks || [],
  });

  const handleRestaurantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantFormData({
      ...restaurantFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updated = restaurantFormData.socialMediaLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    setRestaurantFormData({ ...restaurantFormData, socialMediaLinks: updated });
  };

  const addSocialMediaLink = () => {
    setRestaurantFormData({
      ...restaurantFormData,
      socialMediaLinks: [
        ...restaurantFormData.socialMediaLinks,
        { platform: "", url: "" },
      ],
    });
  };

  const removeSocialMediaLink = (index) => {
    setRestaurantFormData({
      ...restaurantFormData,
      socialMediaLinks: restaurantFormData.socialMediaLinks.filter(
        (_, i) => i !== index,
      ),
    });
  };

  const handleSaveRestaurant = async () => {
    try {
      setIsLoading(true);

      // Prepare payload for restaurant update
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update restaurant",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRestaurant = () => {
    setRestaurantFormData({
      restaurantName: restaurantData?.restaurantName || "",
      address: restaurantData?.address || "",
      city: restaurantData?.city || "",
      state: restaurantData?.state || "",
      pinCode: restaurantData?.pinCode || "",
      country: restaurantData?.country || "",
      description: restaurantData?.description || "",
      restaurantType: restaurantData?.restaurantType || "",
      cuisineTypes: restaurantData?.cuisineTypes?.join(", ") || "",
      isOpen: restaurantData?.isOpen || false,
      contactEmail: restaurantData?.contactDetails?.email || "",
      contactPhone: restaurantData?.contactDetails?.phone || "",
      openingTime: restaurantData?.servingHours?.openingTime || "",
      closingTime: restaurantData?.servingHours?.closingTime || "",
      geoLat: restaurantData?.geoLocation?.lat || "",
      geoLon: restaurantData?.geoLocation?.lon || "",
      socialMediaLinks: restaurantData?.socialMediaLinks || [],
    });
    setEditingRestaurant(false);
  };

  const fetchRestaurantData = async () => {
    try {
      setIsLoadingRestaurant(true);

      const res = await api.get(
        `/restaurant/get-restaurant-data?id=${user._id}`,
      );
      setRestaurantData(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
      setIsLoadingRestaurant(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
    } finally {
      setIsLoadingRestaurant(false);
    }
  };

  useEffect(() => {
    // fetchRestaurantData();
  }, [user]);

  return (
    <>
      <div className="overflow-y-auto h-full p-2 space-y-2">
        {/* User Profile Section */}
        <div className="bg-(--color-base-200) rounded-lg p-3">
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
                <div className="w-25 h-25">
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

        {/* Restaurant Info Section  */}
        {isLoadingRestaurant ? (
          <div className="flex flex-col justify-center items-center h-64">
            <img
              src="../../assets/Loader.gif"
              alt="Loading..."
              className="w-40 h-40"
            />
            <span className="text-lg text-(--color-primary) font-semibold mt-2 animate-bounce">
              Fetching Restaurant Information......
            </span>
          </div>
        ) : loadingRestaurantError ? (
          <div className="flex flex-col justify-center items-center h-64">
            <span className="text-lg text-(--color-error) font-semibold mt-2">
              {loadingRestaurantError}
            </span>
          </div>
        ) : (
          <div className="bg-(--color-base-200) rounded-lg p-3">
            <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
              <div className="flex items-center gap-3">
                <h3 className="w-full text-lg font-semibold">
                  Restaurant Information
                </h3>
                <div className="flex items-center gap-3">
                  <label className="w-22 text-xs font-semibold">
                    Currently Open
                  </label>
                  <input
                    type="checkbox"
                    name="isOpen"
                    checked={restaurantFormData?.isOpen || false}
                    onChange={handleRestaurantChange}
                    className=" w-4 h-4 accent-(--color-primary)"
                    disabled={!editingRestaurant}
                  />
                  <span className="text-xs">
                    {restaurantFormData?.isOpen ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {!editingRestaurant ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingRestaurant(true)}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                  >
                    <MdEdit /> Edit
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleSaveRestaurant}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancelRestaurant}
                    className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
              <div className="w-full">
                <label className="text-xs font-semibold">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={restaurantFormData?.restaurantName || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>
              <div className="w-full">
                <label className="text-xs font-semibold">Restaurant Type</label>
                <select
                  name="restaurantType"
                  value={restaurantFormData?.restaurantType || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                >
                  <option value="">Select type</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="jain">Jain</option>
                  <option value="vegan">Vegan</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold">
                  Cuisine Types{" "}
                  <span className="font-normal text-(--color-secondary)">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  name="cuisineTypes"
                  value={restaurantFormData?.cuisineTypes || ""}
                  onChange={handleRestaurantChange}
                  placeholder="e.g. Indian, Chinese, Italian"
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={restaurantFormData?.contactEmail || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={restaurantFormData?.contactPhone || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-2">
                <div className="w-full">
                  <label className="text-xs font-semibold">Opening Time</label>
                  <input
                    type="time"
                    name="openingTime"
                    value={restaurantFormData?.openingTime || ""}
                    onChange={handleRestaurantChange}
                    className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                    disabled={!editingRestaurant}
                  />
                </div>

                <div className="w-full">
                  <label className="text-xs font-semibold">Closing Time</label>
                  <input
                    type="time"
                    name="closingTime"
                    value={restaurantFormData?.closingTime || ""}
                    onChange={handleRestaurantChange}
                    className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                    disabled={!editingRestaurant}
                  />
                </div>
              </div>

              <div className="w-full col-span-1 md:col-span-3">
                <label className="text-xs font-semibold">Description</label>
                <textarea
                  name="description"
                  value={restaurantFormData?.description || ""}
                  onChange={handleRestaurantChange}
                  rows={3}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded resize-none`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={restaurantFormData?.address || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>
              <div className="w-full">
                <label className="text-xs font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  value={restaurantFormData?.city || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>
              <div className="w-full">
                <label className="text-xs font-semibold">State</label>
                <input
                  type="text"
                  name="state"
                  value={restaurantFormData?.state || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>
              <div className="w-full">
                <label className="text-xs font-semibold">Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={restaurantFormData?.pinCode || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>
              <div className="w-full">
                <label className="text-xs font-semibold">Country</label>
                <input
                  type="text"
                  name="country"
                  value={restaurantFormData?.country || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-2">
                <div className="w-full">
                  <label className="text-xs font-semibold">Latitude</label>
                  <input
                    type="text"
                    name="geoLat"
                    value={restaurantFormData?.geoLat || ""}
                    onChange={handleRestaurantChange}
                    placeholder="e.g. 28.6139"
                    className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                    disabled={!editingRestaurant}
                  />
                </div>

                <div className="w-full">
                  <label className="text-xs font-semibold">Longitude</label>
                  <input
                    type="text"
                    name="geoLon"
                    value={restaurantFormData?.geoLon || ""}
                    onChange={handleRestaurantChange}
                    placeholder="e.g. 77.2090"
                    className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded`}
                    disabled={!editingRestaurant}
                  />
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold">
                  Social Media Links
                </label>
                {editingRestaurant && (
                  <button
                    type="button"
                    onClick={addSocialMediaLink}
                    className="text-xs bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded"
                  >
                    + Add Link
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {restaurantFormData.socialMediaLinks.map((link, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-2 items-center"
                  >
                    <input
                      type="text"
                      placeholder="Platform (e.g. Instagram)"
                      value={link.platform}
                      onChange={(e) =>
                        handleSocialMediaChange(
                          index,
                          "platform",
                          e.target.value,
                        )
                      }
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded text-sm`}
                      disabled={!editingRestaurant}
                    />
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) =>
                          handleSocialMediaChange(index, "url", e.target.value)
                        }
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-(--color-base-100)" : "bg-(--color-base-200)"} rounded text-sm`}
                        disabled={!editingRestaurant}
                      />
                      {editingRestaurant && (
                        <button
                          type="button"
                          onClick={() => removeSocialMediaLink(index)}
                          className="text-red-500 text-sm px-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {restaurantFormData.socialMediaLinks.length === 0 && (
                  <p className="text-xs text-(--color-secondary)">
                    No social media links added.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
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

export default RestaurantSettings;
