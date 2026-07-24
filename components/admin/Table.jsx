export default function DataTable({
  columns,
  rows,
  loading,
  emptyText = "No data found",
}) {
  if (loading) {
    return <p className="p-5 text-gray-500">Loading...</p>;
  }

  if (!rows || rows.length === 0) {
    return <p className="p-5 text-gray-500">{emptyText}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-[4px] border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-3 font-medium text-gray-700">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row._id || i}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
