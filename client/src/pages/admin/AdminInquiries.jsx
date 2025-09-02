import { useEffect, useState } from "react";
import API from "../../utils/api";
import Loader from "../../components/Loader";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msgPopup, setMsgPopup] = useState({
    show: false,
    text: "",
    pos: { x: 0, y: 0 },
  });

  const statusOptions = ["Pending", "Contacted", "Deal Done", "Not Interested"];

  useEffect(() => {
    API.get("/inquiry")
      .then((res) => setInquiries(res.data))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false));
  }, []);

  // Update status handler
  const handleStatusChange = async (inquiryId, status) => {
    try {
      await API.patch(`/inquiry/${inquiryId}`, { status });
      setInquiries((iqs) =>
        iqs.map((iq) => (iq._id === inquiryId ? { ...iq, status } : iq))
      );
    } catch (err) {
      alert("Status update failed. Try again.");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await API.delete(`/inquiry/${id}`); // expects 204
      setInquiries((prev) => prev.filter((i) => i._id !== id));
    } catch (e) {
      alert(e?.response?.data?.error || "Delete failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="p-6 min-h-screen bg-zinc-900">
      <h2 className="font-bold text-2xl mb-8 text-white text-center">
        All Inquiries
      </h2>
      {inquiries.length === 0 ? (
        <div className="text-center text-orange-300 text-lg mt-12">
          No inquiries found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded shadow-lg">
          <table className="min-w-[900px] w-full bg-zinc-800 rounded-lg text-sm text-white">
            <thead>
              <tr className="bg-zinc-700 text-orange-300">
                <th className="px-3 py-2">Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country/City</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Quantity</th>
                <th>Packaging</th>
                <th>Business Requirement</th>
                <th>Message</th>
                <th>Agreed?</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr
                  key={inq._id}
                  className="border-b border-zinc-700 hover:bg-zinc-900 text-center"
                >
                  <td className="px-3 py-2">{inq.name || "-"}</td>
                  <td className="p-2">{inq.company || "-"}</td>
                  <td className="p-2">{inq.email || "-"}</td>
                  <td className="p-2">{inq.phone || "-"}</td>
                  <td className="p-2">{inq.country_city || "-"}</td>
                  <td className="p-2">{inq.prodName || "-"}</td>
                  <td className="p-2">{inq.productType || "-"}</td>
                  <td className="p-2">{inq.quantity || "-"}</td>
                  <td className="p-2">{inq.packaging || "-"}</td>
                  <td className="p-2">{inq.businessFrequency || "-"}</td>
                  {/* Message column with truncation, and show on click */}
                  <td
                    style={{
                      maxWidth: 100,
                      cursor: inq.message ? "pointer" : "default",
                    }}
                    className="truncate text-blue-300 hover:underline p-2"
                    onClick={(e) => {
                      if (inq.message) {
                        const rect = e.target.getBoundingClientRect();
                        setMsgPopup({
                          show: true,
                          text: inq.message,
                          pos: {
                            x: rect.left + window.scrollX,
                            y: rect.bottom + window.scrollY,
                          },
                        });
                      }
                    }}
                    title={inq.message || ""}
                  >
                    {inq.message
                      ? inq.message.slice(0, 15) +
                        (inq.message.length > 15 ? "..." : "")
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={
                        inq.agreeToContact
                          ? "text-green-400 font-bold"
                          : "text-red-400 font-bold"
                      }
                    >
                      {inq.agreeToContact ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-2">
                    {inq.createdAt
                      ? new Date(inq.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <select
                      className={`rounded px-2 py-1 bg-zinc-700 border border-gray-600 focus:border-orange-400 font-bold ${
                        inq.status === "Deal Done"
                          ? "text-green-400"
                          : inq.status === "Contacted"
                          ? "text-yellow-300"
                          : inq.status === "Not Interested"
                          ? "text-red-400"
                          : "text-orange-400"
                      }`}
                      value={inq.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(inq._id, e.target.value)
                      }
                    >
                      {statusOptions.map((opt) => (
                        <option value={opt} key={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(inq._id)}
                      className="px-3 py-1 text-red-600 rounded "
                      title="Delete inquiry"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup/Tooltip for full message */}
      {msgPopup.show && (
        <div
          className="fixed bg-zinc-900 text-white p-4 rounded shadow-lg border border-orange-400 max-w-xs z-50"
          style={{ left: msgPopup.pos.x, top: msgPopup.pos.y }}
          onClick={() =>
            setMsgPopup({ show: false, text: "", pos: { x: 0, y: 0 } })
          }
        >
          <div className="font-bold mb-1">Full Message</div>
          <div className="text-sm">{msgPopup.text}</div>
          <div className="text-right mt-2 text-orange-400 cursor-pointer text-xs">
            [click to close]
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminInquiries;
