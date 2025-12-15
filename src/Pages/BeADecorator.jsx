import React from "react";
import useAuth from "../Hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const BeADecorator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleRequestSubmit = (data) => {
    const newDecorator = {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      nid: data.nid,
      phone: data.phone,
      location: data.location,
      specialities: data.specialities?.map((item) => item.value),
    };
    axiosSecure.post(`/decorators`, newDecorator).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Submitted!",
          text: "Your request is currently being processed. We will contact you shortly.",
          icon: "success",
          showConfirmButton: true,
          timer: 1500,
        });
        navigate("/");
      }
    });
    console.log(newDecorator);
  };

  const options = [
    {
      value: "Wedding Decoration Specialist",
      label: "Wedding Decoration Specialist",
    },
    {
      value: "Home Interior Styling Expert",
      label: "Home Interior Styling Expert",
    },
    { value: "Lighting & Stage Designer", label: "Lighting & Stage Designer" },
    {
      value: "Corporate Decoration Expert",
      label: "Corporate Decoration Expert",
    },
    { value: "Floral Decoration Expert", label: "Floral Decoration Expert" },
    {
      value: "Birthday & Party Decorator",
      label: "Birthday & Party Decorator",
    },
    {
      value: "Office workspace design specialist",
      label: "Office workspace design specialist",
    },
    {
      value: "Ceremony event decoration specialist",
      label: "Ceremony event decoration specialist",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Be a Decorator</h1>
          <p className="text-secondary">
            Join as a professional decorator in StyleDecor
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRequestSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NID Number<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("nid", { required: true })}
                placeholder="Enter your NID number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
              />
              {errors.nid && (
                <p className="text-red-600 text-sm mt-1">NID is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country={"bd"}
                    containerClass="w-full"
                    inputClass="w-full"
                    buttonClass="!border-gray-300 !rounded-l-lg"
                    inputStyle={{
                      width: "100%",
                      height: "48px",
                      fontSize: "16px",
                      paddingLeft: "48px",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem",
                    }}
                    buttonStyle={{
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem 0 0 0.5rem",
                      backgroundColor: "white",
                    }}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  Phone number is required
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("location", { required: true })}
              placeholder="Your Service Area (e.g. Dhaka, Chittagong)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:outline-none focus:ring-0"
            />
            {errors.location && (
              <p className="text-red-600 text-sm mt-1">Location is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialities<span className="text-red-500">*</span>
            </label>
            <Controller
              name="specialities"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.specialities && (
              <p className="text-red-600 text-sm mt-1">
                Specialities are required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeADecorator;
