
import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1000px] py-10">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-sm sm:text-base text-richblack-300 mt-3 w-full max-w-[90%] mx-auto">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-10 md:mt-12 mx-auto w-full max-w-[700px] px-2 sm:px-4">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
