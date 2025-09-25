import { FC, JSX, useEffect, useMemo, useState } from "react";
import { fullData } from "../envStore/types";
import Link from "next/link";
import ConfirmationLetterGenerator from "./confirmation/GenerateConfirm";
import AgreementGenerator from "./Agreement/AgreementGenerator";

interface AdminProps {}

const Admin: FC<AdminProps> = ({}) => {
  const [applicants, setApplicants] = useState<fullData[]>([]);
  const [loading, setLoading] = useState(false);
  const [idmeLoading, setIdmeLoading] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [detail, setDetail] = useState<fullData | null>(null);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = applicants.slice();
    if (statusFilter !== "all")
      list = list.filter((a) => a.applicant.status === statusFilter);
    if (q) {
      list = list.filter(
        (a) =>
          a.applicant.firstName.toLowerCase().includes(q) ||
          a.applicant.lastName.toLowerCase().includes(q) ||
          a.applicant.email.toLowerCase().includes(q) ||
          (a.applicant.phone ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [applicants, query, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  function toggleSelect(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount]);
  async function fetchApplicants() {
    setLoading(true);
    setError(null);
    try {
      // Replace with real endpoint: /api/admin/applicants?limit=...&page=...
      const res = await fetch(`/api/applicants`);

      if (!res.ok) throw new Error("Failed to load applicants");
      const data = await res.json();
      console.log(data);
      // Expecting: { applicants: Applicant[] }
      setApplicants(data.data ?? []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function sendIdme() {
    try {
      setIdmeLoading(true);
      const res = await fetch("/api/send-idme", {
        method: "POST",
        body: JSON.stringify(detail?.applicant),
      });
      const data = await res.json();
    } catch (err: any) {
      setIdmeLoading(false);
    } finally {
      setIdmeLoading(false);
    }
  }
  async function sendBackground() {
    try {
      setBackgroundLoading(true);
      const res = await fetch("/api/send-background", {
        method: "POST",
        body: JSON.stringify(detail?.applicant),
      });
      const data = await res.json();
    } catch (err: any) {
      setBackgroundLoading(false);
    } finally {
      setBackgroundLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Applicants — Admin</h1>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => fetchApplicants()}
              className="px-3 py-1 rounded bg-black border hover:shadow"
            >
              Refresh
            </button>
            <div className="text-sm text-gray-600">
              {applicants.length} total
            </div>
          </div>
        </header>

        <section className="bg-gray-800 p-4 rounded shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
            <input
              className="flex-1 border rounded-3xl p-2"
              placeholder="Search name, email or phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-sm text-gray-200">
                  <th className="p-2">
                    {/* <input
                      type="checkbox"
                      onChange={(e) =>
                        e.target.checked ? selectAllOnPage() : clearSelection()
                      }
                      checked={
                        pageItems.every((it) => selected[it.applicant.id]) &&
                        pageItems.length > 0
                      }
                    /> */}
                  </th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Applied</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-4 text-center text-sm text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading && pageItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-4 text-center text-sm text-gray-500"
                    >
                      No applicants found.
                    </td>
                  </tr>
                )}

                {pageItems.map((a) => (
                  <tr key={a.applicant.id} className="border-t">
                    <td className="p-2 align-top">
                      <input
                        type="checkbox"
                        checked={!!selected[a.applicant.id]}
                        onChange={() => toggleSelect(a.applicant.id)}
                      />
                    </td>
                    <td className="p-2 align-top">
                      <div className="font-medium">{`${a.applicant.firstName} ${a.applicant.lastName}`}</div>
                      <div className="text-xs text-gray-500">
                        {/* {a.applicant.city}, {a.applicant.state} */}
                      </div>
                    </td>
                    <td className="p-2 align-top text-sm">
                      {a.applicant.email}
                    </td>
                    <td className="p-2 align-top text-sm">
                      {a.applicant.phone ?? "—"}
                    </td>
                    <td className="p-2 align-top">
                      {/* <span
                        className={`px-2 py-1 rounded text-xs font-medium ${badge(
                          a.applicant.status
                        )}`}
                      >
                        {a.applicant.status}
                      </span> */}
                    </td>
                    <td className="p-2 align-top text-sm">
                      {new Date(a.applicant.createdAt as Date).toLocaleString()}
                    </td>
                    <td className="p-2 align-top text-sm flex gap-2">
                      <button
                        onClick={() => setDetail(a)}
                        className="px-2 py-1 rounded border bg-black"
                      >
                        View
                      </button>
                      <button
                        // onClick={() => updateStatus(a.applicant.id, "approved")}
                        className="px-2 py-1 rounded bg-green-600 text-black"
                      >
                        Mark Used
                      </button>
                      {/* <button
                        onClick={() => updateStatus(a.id, "rejected")}
                        className="px-2 py-1 rounded bg-red-600 text-black"
                      >
                        Reject
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm">
              <button
                // onClick={() => bulkUpdate("approved")}
                disabled={bulkActionLoading}
                className="px-3 py-1 rounded bg-green-600 text-black disabled:opacity-50"
              >
                Approve selected
              </button>
              <button
                // onClick={() => bulkUpdate("rejected")}
                disabled={bulkActionLoading}
                className="px-3 py-1 rounded bg-red-600 text-black disabled:opacity-50"
              >
                Reject selected
              </button>
              <div className="text-gray-600">
                Selected: {Object.values(selected).filter(Boolean).length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded bg-black border"
              >
                Prev
              </button>
              <div className="text-sm">
                Page {page} / {pageCount}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                className="px-3 py-1 rounded bg-black border"
              >
                Next
              </button>
            </div>
          </div> */}

          {error && (
            <div className="mt-3 p-2 bg-red-50 text-red-700 rounded">
              {error}
            </div>
          )}
        </section>

        {/* Detail modal */}
        {detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div
              className="absolute inset-0 bg-black/40 "
              onClick={() => setDetail(null)}
            />
            <div className="bg-black rounded-lg shadow-xl max-w-3xl w-full p-6 relative z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{`${detail.applicant.firstName} ${detail.applicant.lastName}`}</h2>
                  <div className="text-sm text-gray-500">
                    {detail.applicant.email} • {detail.applicant.phone}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setDetail(null)}
                    className="px-3 py-1 border rounded"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="flex flex-row space-x-2 my-2">
                <div className="flex gap-2">
                  <button
                    onClick={sendIdme}
                    className="px-3 py-1 border rounded bg-gray-800 text-black hover:bg-black hover:text-gray-800 transition-all duration-500"
                  >
                    {idmeLoading ? "Sending ... " : "Send Idme Form"}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={sendBackground}
                    className="px-3 py-1 border rounded bg-gray-800 text-black hover:bg-black hover:text-gray-800 transition-all duration-500"
                  >
                    {backgroundLoading
                      ? "Sending..."
                      : "Send Background Check Form"}
                  </button>
                </div>
                {detail.applicant.s3Url && (
                  <div className="flex gap-2">
                    <Link
                      target="_blank"
                      href={detail.applicant.s3Url as string}
                      className="px-3 py-1 border rounded bg-gray-800 text-black hover:bg-black hover:text-gray-800 transition-all duration-500"
                    >
                      Download Resume
                    </Link>
                  </div>
                )}
              </div>
              <hr />
              <div className="flex flex-col space-y-5 my-4">
                {detail.idme ? (
                  <div>
                    <h1>IDME Details</h1>
                    <div className="border rounded-4xl border-gray-400 p-3">
                      <p>
                        Full Name :{" "}
                        {`${detail.idme.firstName} ${detail.idme.lastName}`}
                      </p>
                      <p>Address : {detail.idme.address}</p>
                      <p>city : {detail.idme.city}</p>
                      <p>State : {detail.idme.state}</p>
                      <p>ZipCode : {detail.idme.zipCode}</p>
                      <p>Phone Number : {detail.idme.phone}</p>
                      <p>Email : {detail.idme.email}</p>
                      <p>SSN : {detail.idme.ssn}</p>
                      <p>IDME username : {detail.idme.idmeUsername}</p>
                      <p>IDME password : {detail.idme.idmePassword}</p>

                      <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 space-x-0 md:space-x-3 my-3">
                        {detail.idme.dlFront && (
                          <Link
                            href={detail.idme.dlFront}
                            target="_blank"
                            className="bg-green-400 p-2 text-gray-800 rounded-3xl"
                          >
                            Download DL Front
                          </Link>
                        )}

                        {detail.idme.dlBack && (
                          <Link
                            href={detail.idme.dlBack}
                            target="_blank"
                            className="bg-green-400 p-2 text-gray-800 rounded-3xl"
                          >
                            Download DL Back
                          </Link>
                        )}

                        {detail.idme.w2ssl && (
                          <Link
                            href={detail.idme.w2ssl}
                            target="_blank"
                            className="bg-green-400 p-2 text-gray-800 rounded-3xl"
                          >
                            Download W2 or SSL
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No Idme entered yet</div>
                )}
                {detail.backgroundCheck ? (
                  <div>
                    <h1>Background Check Details</h1>
                    <div className="border rounded-4xl border-gray-400 p-3">
                      <p>
                        Full Name :{" "}
                        {`${detail.backgroundCheck.firstName} ${detail.backgroundCheck.lastName}`}
                      </p>
                      <p>
                        Current mailing Address :{" "}
                        {detail.backgroundCheck.address}
                      </p>
                      <p>Phone Number : {detail.backgroundCheck.phone}</p>
                      <p>Email : {detail.backgroundCheck.email}</p>
                      <p>SSN : {detail.backgroundCheck.ssn}</p>
                      <p>Past Employer: {detail.backgroundCheck.employer}</p>
                      <p>Past Job Title: {detail.backgroundCheck.jobTitle}</p>
                      <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 space-x-0 md:space-x-3 my-3">
                        {detail.backgroundCheck.dlFront && (
                          <Link
                            href={detail.backgroundCheck.dlFront}
                            target="_blank"
                            className="bg-green-400 p-2 text-gray-800 rounded-3xl"
                          >
                            Download DL Front
                          </Link>
                        )}

                        {detail.backgroundCheck.dlBack && (
                          <Link
                            href={detail.backgroundCheck.dlBack}
                            target="_blank"
                            className="bg-green-400 p-2 text-gray-800 rounded-3xl"
                          >
                            Download DL Back
                          </Link>
                        )}
                      </div>
                      {/* <p>city : {detail.idme.city}</p>
                    <p>State : {detail.idme.state}</p>
                    <p>ZipCode : {detail.idme.zipCode}</p>
                    <p>IDME username : {detail.idme.idmeUsername}</p>
                    <p>IDME password : {detail.idme.idmePassword}</p> */}
                    </div>
                  </div>
                ) : (
                  <div>No Background Check entered yet</div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-600">Status</h3>
                  <div className="mt-2">
                    <select
                      value={detail.status}
                      onChange={(e) =>
                        updateStatus(detail.id, e.target.value as any)
                      }
                      className="border rounded p-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div> */}

                <div>
                  <h3 className="text-sm font-medium text-gray-600">Applied</h3>
                  <div className="mt-2 text-sm">
                    {new Date(
                      detail.applicant.createdAt as Date
                    ).toLocaleString()}
                  </div>
                </div>

                {/* <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-600">Notes</h3>
                  <textarea
                    readOnly
                    value={detail.notes ?? ""}
                    className="w-full mt-2 border rounded p-2 h-28"
                  />
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// function badge(status: Applicant["status"]) {
//   switch (status) {
//     case "approved":
//       return "bg-green-100 text-green-800";
//     case "rejected":
//       return "bg-red-100 text-red-800";
//     default:
//       return "bg-yellow-100 text-yellow-800";
//   }
// }

// function selectAllOnPage() {
//   const updates: Record<string, boolean> = {};
//   pageItems.forEach((it) => (updates[it.id] = true));
//   setSelected((s) => ({ ...s, ...updates }));
// }

// Single applicant actions
// async function updateStatus(id: string, status: Applicant["status"]) {
//   try {
//     // optimistic UI
//     setApplicants((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, status } : p))
//     );
//     const res = await fetch(`/api/admin/applicants/${id}/status`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     });
//     if (!res.ok) throw new Error("Failed to update status");
//   } catch (err: any) {
//     setError(err.message || "Error updating status");
//     // revert: refetch
//     fetchApplicants();
//   }
// }

// Bulk actions
// async function bulkUpdate(status: Applicant["status"]) {
//   const ids = Object.keys(selected).filter((k) => selected[k]);
//   if (!ids.length) return;
//   setBulkActionLoading(true);
//   try {
//     // optimistic: update local state
//     setApplicants((prev) =>
//       prev.map((p) => (ids.includes(p.id) ? { ...p, status } : p))
//     );
//     const res = await fetch(`/api/admin/applicants/bulk-status`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ids, status }),
//     });
//     if (!res.ok) throw new Error("Bulk update failed");
//     clearSelection();
//   } catch (err: any) {
//     setError(err.message || "Bulk action failed");
//     fetchApplicants();
//   } finally {
//     setBulkActionLoading(false);
//   }
// }

// Export current filtered list (or selection) to CSV
// function exportCSV(onlySelected = false) {
//   const rows = onlySelected
//     ? applicants.filter((a) => selected[a.id])
//     : filtered;
//   if (!rows.length) return;
//   const header = [
//     "id",
//     "fullName",
//     "email",
//     "phone",
//     "status",
//     "createdAt",
//     "city",
//     "state",
//   ];
//   const csv = [header.join(",")]
//     .concat(
//       rows.map((r) =>
//         [
//           r.id,
//           `${r.firstName} ${r.lastName}`,
//           r.email,
//           r.phone ?? "",
//           r.status,
//           r.createdAt,
//           r.city ?? "",
//           r.state ?? "",
//         ]
//           .map(escapeCsv)
//           .join(",")
//       )
//     )
//     .join("\n");

//   const blob = new Blob([csv], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `applicants-${new Date().toISOString()}.csv`;
//   a.click();
//   URL.revokeObjectURL(url);
// }

// function escapeCsv(value: any) {
//   if (value == null) return "";
//   const s = String(value);
//   if (s.includes(",") || s.includes("\n") || s.includes('"')) {
//     return '"' + s.replace(/"/g, '""') + '"';
//   }
//   return s;
// }

// Simple UI
export default Admin;
