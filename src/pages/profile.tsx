import Head from "next/head";
import React, { useState, useEffect } from "react";
import TextField from "@/components/FormField/TextField";
import DatePickerInput from "@/components/FormField/DatePickerInput";
import ImageUploader from "@/components/FormField/ImageUploader";
import { handleResource } from "@/utils/APIRequester";
import { useUserContext } from "@/contexts/UserContext";

const Profile: React.FC = () => {
  const { user, loading: userLoading, refreshUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    contact_number: "",
    birthday: "",
    bio: "",
  });

  // Populate form data from context user
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        address: user.address || "",
        contact_number: user.contact_number || "",
        birthday: user.birthday || "",
        bio: user.bio || "",
      });

      if (user.profile_image) {
        setPreviewImage(user.profile_image);
      }
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("contact_number", formData.contact_number);
      formDataToSend.append("birthday", formData.birthday);
      formDataToSend.append("bio", formData.bio);

      if (profileImage) {
        formDataToSend.append("profile_image", profileImage);
      }

      await handleResource({
        method: "patch",
        endpoint: "/users/me/",
        data: formDataToSend,
        isMultipart: true,
        popupMessage: true,
        popupText: "Profile updated successfully!",
      });

      refreshUser(); // Refresh user context to update both sidebar and profile page
    } catch {
      // Error handled by handleResource
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p className="text-xl text-gray-600">Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="px-8 py-5">
        <h1 className="text-3xl font-bold text-black mb-6 border-b">
          Account Information
        </h1>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit}>
            {/* Profile Image Upload - First Row */}
            <ImageUploader
              previewImage={previewImage}
              onImageChange={handleImageChange}
              buttonText="Upload New Photo"
              imageSize="medium"
            />

            <div className="border-2 border-gray-300 rounded-lg px-8 py-4">
              {/* First Name & Last Name - Same Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <TextField
                  name="first_name"
                  placeholder="Enter first name"
                  title="First Name"
                  type="text"
                  required={false}
                  value={formData.first_name}
                  onChange={(value) => handleChange("first_name", value)}
                />
                <TextField
                  name="last_name"
                  placeholder="Enter last name"
                  title="Last Name"
                  type="text"
                  required={false}
                  value={formData.last_name}
                  onChange={(value) => handleChange("last_name", value)}
                />
              </div>

              {/* Email - Single Row */}
              <TextField
                name="email"
                placeholder="Enter email"
                title="Email"
                type="email"
                required={false}
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
              />

              {/* Address & Contact Number - Same Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <TextField
                    name="address"
                    placeholder="Enter address"
                    title="Address"
                    type="text"
                    required={false}
                    value={formData.address}
                    onChange={(value) => handleChange("address", value)}
                  />
                </div>
                <div>
                  <TextField
                    name="contact_number"
                    placeholder="Enter contact number"
                    title="Contact Number"
                    type="text"
                    required={false}
                    value={formData.contact_number}
                    onChange={(value) => handleChange("contact_number", value)}
                  />
                </div>
              </div>

              {/* Birthday - Single Row with Border */}
              <DatePickerInput
                name="birthday"
                placeholder="Select birthday"
                title="Birthday"
                required={false}
                value={formData.birthday}
                onChange={(value) => handleChange("birthday", value)}
                className="mb-0"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-center gap-5 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#5272FF] text-white px-8 py-3 rounded-lg font-semibold  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#8CA3CD] text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
