import { useState } from "react";
import supabase from "../config/supabaseConfig";
import { FiUser, FiBriefcase, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function AddUser() {
  const [name, setName] = useState("");
  const [tital, setTital] = useState(""); // Changed from "title" to "tital"
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setFormError(null);
    setSuccess(false);
    setIsLoading(true);

    // Validation
    if (!name.trim() || !tital.trim()) {
      setFormError("Both name and title are required");
      setIsLoading(false);
      return;
    }

    if (name.length > 50) {
      setFormError("Name should be less than 50 characters");
      setIsLoading(false);
      return;
    }

    if (tital.length > 100) {
      setFormError("Title should be less than 100 characters");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .insert([{ tital, name }]) // Corrected to "tital"
        .select();

      if (error) {
        throw error;
      }

      // Success handling
      console.log("User added:", data);
      setSuccess(true);
      setName("");
      setTital("");
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error adding user:", error);
      setFormError(error.message || "Failed to add user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New User</h2>
        <p className="text-gray-600">Enter user details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <FiUser className="text-gray-500" />
                <span>Full Name</span>
              </div>
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-3 pl-11 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  formError && !name.trim() ? "border-red-300" : "border-gray-300"
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter full name"
                disabled={isLoading}
              />
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <FiBriefcase className="text-gray-500" />
                <span>Job Title</span>
              </div>
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-3 pl-11 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  formError && !tital.trim() ? "border-red-300" : "border-gray-300"
                }`}
                value={tital}
                onChange={(e) => setTital(e.target.value)} // Fixed setter
                type="text"
                placeholder="Enter job title"
                disabled={isLoading}
              />
              <FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]"
          } text-white shadow-lg hover:shadow-xl`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding User...</span>
            </>
          ) : (
            <>
              <FiUser className="text-lg" />
              <span>Add User</span>
            </>
          )}
        </button>
      </form>

      {/* Status Messages */}
      <div className="mt-6 space-y-3">
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 animate-fade-in">
            <FiCheckCircle className="text-xl shrink-0" />
            <div>
              <p className="font-medium">User added successfully!</p>
              <p className="text-sm text-green-600 mt-1">The user has been added to the database.</p>
            </div>
          </div>
        )}

        {formError && (
          <div className="flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 animate-fade-in">
            <FiAlertCircle className="text-xl shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error occurred</p>
              <p className="text-sm text-red-600 mt-1">{formError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Character Counters */}
      <div className="flex justify-between text-xs text-gray-500 mt-4 px-1">
        <span className={name.length > 50 ? "text-red-500" : ""}>
          {name.length}/50 characters
        </span>
        <span className={tital.length > 100 ? "text-red-500" : ""}> {/* Fixed variable name */}
          {tital.length}/100 characters
        </span>
      </div>

      {/* Form Status Info */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Form ready to submit</span>
        </div>
      </div>
    </div>
  );
}