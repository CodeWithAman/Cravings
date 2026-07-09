import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto, MdEdit } from "react-icons/md";

const AdminSettings = () => {
  const { user, setUser } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

      const response = await api.put(`/user/edit-profile`, payload);

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

  return (
    <>
      <div className="overflow-y-auto h-full p-6 space-y-6">
        {/* User Profile Section */}
        <div className="bg-(--color-base-200) rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            {!isEditable ? (
              <button
                onClick={() => setIsEditable(true)}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
              >
                <MdEdit /> Edit
              </button>
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
                <div className="w-36 h-36">
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
                <div className="grid grid-cols-5 gap-2 justify-center items-center">
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isEditable ? "border-(--color-secondary)" : "border-transparent"} rounded col-span-4`}
                    disabled={!isEditable}
                  />

                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isEditable ? "border-(--color-secondary) text-(--color-secondary) disabled:bg-(--color-secondary)/50 cursor-not-allowed" : "border-transparent"} rounded col-span-4`}
                    disabled
                  />

                  <label className="block text-sm font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isEditable ? "border-(--color-secondary)" : "border-transparent"} rounded col-span-4`}
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
