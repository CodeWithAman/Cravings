import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiEdit2, FiLock } from "react-icons/fi";

const Settings = () => {
  const { user, setUser } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditable(false);

    const payLoad = {
      email: tempUser.email.toLowerCase(),
      fullName: tempUser.fullname,
      phone: tempUser.phone,
    };

    console.log(payLoad);

    try {
      const res = await api.put("/user/edit-profile", payLoad);
      setUser(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  return (
    <>
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold text-(--color-base-content) mb-1">
          Account Settings
        </h2>
        <p className="text-sm text-(--color-secondary) mb-6">
          Manage your personal information
        </p>

        <div className="bg-(--color-base-100) border border-(--color-base-300) rounded-2xl p-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-(--color-base-300)">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-(--color-base-200) shrink-0">
              <img
                src={user.photo}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-(--color-base-content)">
                {user.fullname}
              </p>
              <p className="text-sm text-(--color-secondary)">{user.email}</p>
            </div>
          </div>

          {/* Fields */}
          {isEditable === true ? (
            <div className="grid gap-4 mb-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-(--color-secondary) mb-1.5">
                  <FiUser size={14} /> Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={tempUser.fullname}
                  onChange={handleChange}
                  className="w-full border border-(--color-base-300) rounded-lg px-3 py-2.5 text-sm text-(--color-base-content) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-(--color-secondary) mb-1.5">
                  <FiMail size={14} /> Email
                  <FiLock size={11} className="ml-auto text-(--color-secondary)" />
                </label>
                <input
                  type="email"
                  name="email"
                  value={tempUser.email}
                  disabled
                  className="w-full border border-(--color-base-300) rounded-lg px-3 py-2.5 text-sm text-(--color-base-content) disabled:bg-(--color-base-200) disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-(--color-secondary) mb-1.5">
                  <FiPhone size={14} /> Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  value={tempUser.phone}
                  onChange={handleChange}
                  className="w-full border border-(--color-base-300) rounded-lg px-3 py-2.5 text-sm text-(--color-base-content) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition"
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 mb-6">
              {[
                { icon: <FiUser size={16} />, label: "Full Name", value: user.fullname },
                { icon: <FiMail size={16} />, label: "Email", value: user.email },
                { icon: <FiPhone size={16} />, label: "Phone", value: user.phone },
              ].map((field) => (
                <div
                  key={field.label}
                  className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-(--color-base-300)"
                >
                  <div className="w-8 h-8 rounded-lg bg-(--color-primary)/10 flex items-center justify-center text-(--color-primary) shrink-0">
                    {field.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-(--color-secondary) leading-none mb-1">
                      {field.label}
                    </p>
                    <p className="text-sm font-medium text-(--color-base-content) truncate">
                      {field.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {isEditable === true ? (
              <>
                <button
                  onClick={() => setIsEditable(false)}
                  className="px-5 py-2.5 rounded-lg border border-(--color-base-300) text-(--color-secondary) text-sm font-semibold hover:bg-(--color-base-200) transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-lg bg-(--color-primary) text-(--color-primary-content) text-sm font-semibold hover:opacity-90 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditable(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-(--color-primary) text-(--color-primary-content) text-sm font-semibold hover:opacity-90 transition"
              >
                <FiEdit2 size={14} /> Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;