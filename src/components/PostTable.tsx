import { IProduct } from "./admin/main";

// components/ProductTable.tsx
export default function PostTable({
  posts,
  setDisplay,
  setSinglePost,
}: {
  posts: IProduct[];
  setDisplay: (prop: string) => void;
  setSinglePost: (prop: IProduct) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full  border ">
        <thead className="items-center bg-secondary text-primary font-semibold">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Product
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Discount Amount
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((item, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 text-sm text-gray-800">{item?.title}</td>
              <td className="px-4 py-2 text-sm text-gray-800">
                ${item?.price}
              </td>
              <td className="px-4 py-2 text-sm text-green-600">
                {item?.discountAmount}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {item?.category?.name}
              </td>
              <td className="flex px-4 py-2 gap-2">
                <button
                  className="px-3 py-1 text-sm text-primary bg-action rounded hover:bg-blue-700"
                  onClick={() => {
                    setDisplay("addReview");
                    setSinglePost(item);
                  }}
                >
                  Add Review
                </button>
                <button
                  className="px-3 py-1 text-sm text-primary bg-action rounded hover:bg-blue-700"
                  onClick={() => {
                    setDisplay("addTag");
                    setSinglePost(item);
                  }}
                >
                  Add Tag
                </button>
                {/* <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
