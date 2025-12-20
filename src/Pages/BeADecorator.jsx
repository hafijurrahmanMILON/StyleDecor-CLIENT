import React from "react";
import useAuth from "../Hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { HiOutlineBadgeCheck, HiOutlineSparkles } from "react-icons/hi";

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
          title: "Request Sent!",
          text: "Your application is under review. Our team will contact you soon.",
          icon: "success",
          confirmButtonColor: "#4F46E5", 
        });
        navigate("/");
      }
    });
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
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#fdfdfd] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-widest">
            <HiOutlineSparkles className="animate-pulse" /> Join the Elite Team
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary tracking-tight leading-tight">
            Become a <span className="text-primary italic">StyleDecorator</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto font-light">
            Share your expertise and help us redefine professional decoration
            services across Bangladesh.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRequestSubmit)}
          className="space-y-8"
        >
          <div className="bg-gray-50/50 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-50">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Full Name
              </label>
              <div className="flex hover:cursor-not-allowed items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-2xl text-gray-400 font-medium">
                <HiOutlineBadgeCheck className="text-primary" />{" "}
                {user?.displayName}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Official Email
              </label>
              <div className="px-4 py-3 hover:cursor-not-allowed bg-white border border-gray-100 rounded-2xl text-gray-400 font-medium truncate">
                {user?.email}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-3 ml-1">
                NID Number <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                {...register("nid", { required: true })}
                placeholder="Ex: 1234567890"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              />
              {errors.nid && (
                <p className="text-red-400 text-[10px] font-bold mt-2 ml-2 uppercase tracking-wide">
                  NID is required for verification
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-3 ml-1">
                Contact Phone <span className="text-primary">*</span>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country={"bd"}
                    inputStyle={{
                      width: "100%",
                      height: "56px",
                      fontSize: "16px",
                      borderRadius: "1rem",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "white",
                    }}
                    buttonStyle={{
                      border: "none",
                      backgroundColor: "transparent",
                      marginLeft: "8px",
                    }}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-400 text-[10px] font-bold mt-2 ml-2 uppercase tracking-wide">
                  Valid phone number required
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-3 ml-1">
              Primary Location <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              {...register("location", { required: true })}
              placeholder="E.g. Banani, Dhaka"
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
            {errors.location && (
              <p className="text-red-400 text-[10px] font-bold mt-2 ml-2 uppercase tracking-wide">
                Service area is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-widest mb-3 ml-1">
              Expertise Specialities <span className="text-primary">*</span>
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
                  classNamePrefix="premium-select"
                  styles={customSelectStyles}
                />
              )}
            />
            {errors.specialities && (
              <p className="text-red-400 text-[10px] font-bold mt-2 ml-2 uppercase tracking-wide">
                Please select at least one specialty
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-5 px-6 rounded-2xl transition-all duration-500 shadow-xl shadow-secondary/10 hover:shadow-primary/20 active:scale-[0.98] text-sm uppercase tracking-widest mt-4"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    padding: "8px",
    borderRadius: "1rem",
    borderColor: state.isFocused ? "#4F46E5" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 4px rgba(79, 70, 229, 0.05)" : "none",
    "&:hover": { borderColor: "#4F46E5" },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#F0EFFF",
    borderRadius: "8px",
    padding: "2px 8px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#4F46E5",
    fontWeight: "600",
    fontSize: "12px",
  }),
};

export default BeADecorator;
