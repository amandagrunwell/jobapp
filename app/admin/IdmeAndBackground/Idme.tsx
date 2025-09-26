import { ChangeEvent, FC, JSX, useState } from "react";

interface IdmeProps {}

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
};

const Idme: FC<IdmeProps> = ({}) => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [idmeLoading, setIdmeLoading] = useState(false);

  async function sendIdme() {
    if (!form.email || !form.firstName) {
      alert("You need to enter first name and email");
      return;
    }
    try {
      setIdmeLoading(true);
      const res = await fetch("/api/send-idme", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      await new Promise((res) => setTimeout(res, 2000));
    } catch (err: any) {
      setIdmeLoading(false);
    } finally {
      setIdmeLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl my-5">This form is to send IDME Form </h1>
      <div className="bg-gray-900 border border-gray-600 rounded-4xl p-5">
        <form action="" className="flex flex-col space-y-2 ">
          <div className="flex md:flex-row nd:space-x-2 flex-col space-y-3 md:space-y-0 justify-between">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                // value={confirmationData.employeeName}
                // onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter employee full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                last Name
              </label>
              <input
                required
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter employee full name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <button
            onClick={sendIdme}
            type="button"
            disabled={idmeLoading} // <-- disables the button while loading
            className={`px-3 py-1 my-3 border bg-gray-200 rounded-3xl text-black
        transition-all duration-500
        hover:bg-black hover:text-gray-200
        ${idmeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {idmeLoading ? "Sending ... " : "Send Idme Form"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Idme;
