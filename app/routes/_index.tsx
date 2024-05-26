import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "20px" }}>
      <h1 className="text-3xl font-bold underline">Payment Form</h1>
      <Form method="post" className="space-y-4">
      <div>
          <label className="block">Payment Date</label>
          <input type="date" name="paymentDate" className="mt-1 block w-full border rounded px-3 py-1" />
        </div>
        <div>
          <label className="block">Title</label>
          <input type="text" name="title" className="mt-1 block w-full border rounded px-3 py-1" />
        </div>
        <div>
          <label className="block">Tags</label>
          <input type="text" name="tags" className="mt-1 block w-full border rounded px-3 py-1" />
        </div>
        <div>
          <label className="block">Observation</label>
          <textarea name="observation" className="mt-1 block w-full border rounded px-3 py-1"></textarea>
        </div>
        <div>
          <input id="isPaid" type="checkbox" name="isPaid" className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          <label htmlFor="isPaid" className="block">Is Paid?</label>
        </div>
        <div>
          <input id="isCreditCard" type="checkbox" name="isCreditCard" className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          <label htmlFor="isCreditCard" className="block">Is Credit Card?</label>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
      </Form>
    </div>
  );
}
