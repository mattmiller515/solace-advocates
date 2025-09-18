type ColumnData = {
  label: string;
  accessor: string;
};

export const Table = ({
  columnData,
  data,
}: {
  columnData: ColumnData[];
  data: any[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            {columnData.map((columnDataObj) => (
              <th key={columnDataObj.accessor}>{columnDataObj.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={`data-row-${index}`}>
              {columnData.map((columnDataObj) => (
                <td key={columnDataObj.accessor}>
                  {row[columnDataObj.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
