import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { verfEmailCode, sendVerfEmail, createEmailTicket } from "../services/userService";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message || !form.subject) return;

    try {
      setLoading(true);
      await sendVerfEmail(form.email, form.name);

      setShowCodeInput(true);
    } catch (err) {
      console.error(err);
      setShowCodeInput(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return;

    try {
      setLoading(true);
      const res = await verfEmailCode(form.email, code);

      if (res.data.success) {
        setShowCodeInput(false);
        setCode("");

        await createEmailTicket(form.email, form.name, form.subject, form.message)
        
        alert("Ticket created. Check your inbox.");

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

      } else {
        alert("Invalid or expired code");
      }

    } catch (err) {
      console.error(err);
      alert("Verification failed.");
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="contact-page min-h-screen flex flex-col items-center justify-center gap-[20px] ">
      <PageHeader title="Contact Us" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] border border-cyan-500 rounded-[16px] p-[20px] flex flex-col gap-[16px] backdrop-blur-lg mb-30"
      >
        {/* Name */}
        <div className="flex flex-col gap-[4px]">
          <label className="text-[12px] text-cyan-400">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-black border border-cyan-500 rounded-[8px] px-[10px] py-[6px] text-white"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[4px]">
          <label className="text-[12px] text-cyan-400">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-black border border-cyan-500 rounded-[8px] px-[10px] py-[6px] text-white"
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-[4px]">
          <label className="text-[12px] text-cyan-400">Subject</label>
          <input
            type="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="bg-black border border-cyan-500 rounded-[8px] px-[10px] py-[6px] text-white"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-[4px]">
          <label className="text-[12px] text-cyan-400">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="8"
            className="bg-black border border-cyan-500 rounded-[8px] px-[10px] py-[6px] text-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 text-black font-bold py-[6px] rounded-[8px]"
        >
          {loading ? "Sending..." : "Verify Email"}
        </button>

        {/* Code input */}
        {showCodeInput && (
          <div className="flex flex-col gap-[8px] mt-[10px]">
            <label className="text-[12px] text-cyan-400">
              Enter Verification Code
            </label>

            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-black border border-cyan-500 rounded-[8px] px-[10px] py-[6px] text-white"
            />

            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={loading}
              className="bg-green-500 text-black font-bold py-[6px] rounded-[8px]"
            >
              {loading ? "Verifying..." : "Submit Code"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}