import React from "react";
import Text from "./Text";
import Swal from "sweetalert2";

const Contact = () => {
  const [result, setResult] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setIsButtonDisabled(true);

    const formData = new FormData(event.target);
    formData.append("access_key", "4ba5e60e-3cdc-4ef5-a032-b8c9641edc05");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Success",
          text: "Message sent successfully",
          icon: "success",
        });
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("Failed to send message");
    }

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
  };

  return (
    <div id="contact" className="container text-white">
      <h1 className="relative h-[100px]">
        <Text
          text="CONTACT"
          flex={false}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={12}
        />
      </h1>
      <div className="form mx-auto lg:w-1/2 w-3/4 border border-white p-4 rounded-2xl mt-10">
        <form onSubmit={onSubmit} className="w-full p-5 md:p-10" id="form">
          <p className="text-gray-100 font-bold text-xl mb-2">Let's connect!</p>
          <input
            type="text"
            id="name"
            placeholder="Your Name ..."
            name="name"
            required
            className="mb-2 bg-transparent w-full rounded-md border py-2 pl-2 pr-4"
          />
          <input
            type="email"
            id="email"
            placeholder="Your Email ..."
            name="email"
            required
            className="mb-2 bg-transparent w-full rounded-md border py-2 pl-2 pr-4"
          />
          <textarea
            name="message"
            required
            id="textarea"
            cols="30"
            rows="4"
            placeholder="Your Message ..."
            className="mb-2 bg-transparent w-full rounded-md border py-2 pl-2 pr-4"
          />
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full py-3 border rounded-xl text-gray-100 font-semibold text-xl ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-transparent"
            }`}>
            {isButtonDisabled ? "Please wait..." : "Send Message"}
          </button>
          <p className="text-center text-gray-400 mt-2">{result}</p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
