import  { useEffect } from "react";

interface HeaderProps {
  columns: Array<{
    id: string;
    title: string;
    icon?: React.ReactNode;
    display: boolean;
    width: number;
    grow: number;
  }>;
  columnsWidth: { [key: string]: number };
}

const Header: React.FC<HeaderProps> = ({ columns, columnsWidth }) => {
  useEffect(() => {
    function getAllColumnsWidth() {
      const newColumnsWidth: { [key: string]: number } = {};
      columns.forEach((column) => {
        const colElement = document.getElementById(`th-${column.id}`);
        if (colElement) {
          newColumnsWidth[column.id] = colElement.getBoundingClientRect().width;
        }
      });
      // setColumnsWidth(newColumnsWidth); // This line seems to be from the previous version, should it be removed?
    }

    // Call the function to get initial column widths
    getAllColumnsWidth();

    // ResizeObserver to track changes in column widths
    const resizeObserver = new ResizeObserver(getAllColumnsWidth);
    columns.forEach((column) => {
      const colElement = document.getElementById(`th-${column.id}`);
      if (colElement) {
        resizeObserver.observe(colElement);
      }
    });
    const tableElement = document.querySelector("#table-1");

    // Event listener for window resize
    tableElement?.addEventListener("resize", getAllColumnsWidth);

    // Cleanup function to remove event listeners
    return () => {
      resizeObserver.disconnect();
      tableElement?.removeEventListener("resize", getAllColumnsWidth);
    };
  }, [columns]);

  return (
    <div className="sticky flex top-0 z-10 h-14">
      <div className="bg-white border border-blue-800 flex flex-grow z-10	">
        {columns.map((column, index) =>
          column.display ? (
            <div
              className={`text-center  flex overflow-hidden items-center justify-center ${
                column.icon ? "text-lg" : "text-2xs"
              }`}
              key={index}
              style={
                column.width !== (undefined || 0)
                  ? { width: column.width + "px" }
                  : { flexGrow: column.grow }
              }
              id={`th-${column.id}`}
            >
              {column.icon ? (
                column.icon
              ) : (
                <p className="uppercase text-2xs w-full font-semibold">
                  {column.title}
                </p>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Header;
