type ColumnData = {
  label: string;
  accessor: string;
  formatter?: ({
    cellData,
    rowData,
  }: {
    cellData: any;
    rowData: any;
  }) => React.ReactNode | string;
};

export const Table = ({
  columnData,
  data,
}: {
  columnData: ColumnData[];
  data: any[];
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra">
        <thead>
          <tr>
            {columnData.map((columnDataObj) => (
              <th key={columnDataObj.accessor}>{columnDataObj.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={`data-row-${index}`}>
                {columnData.map((columnDataObj) => (
                  <td key={columnDataObj.accessor}>
                    {columnDataObj.formatter
                      ? columnDataObj.formatter({
                          cellData: row[columnDataObj.accessor],
                          rowData: row,
                        })
                      : row[columnDataObj.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan={columnData.length}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
