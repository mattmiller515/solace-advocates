import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { Pagination } from "@/components/core/Pagination";
import { Table } from "@/components/core/Table";
import { useEffect, useRef, useState } from "react";
import { useGetAdvocates } from "./hooks";
import { SpecialtiesCell } from "./SpecialtiesCell";
import { formatPhoneNumber } from "@/tools/formatters";

export const AdvocatesTable = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { getAdvocates, loading } = useGetAdvocates();
  const getAdvocatesTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleGetAdvocates = ({
    params,
  }: {
    params?: {
      searchTerm?: string;
      page?: number;
    };
  }) => {
    getAdvocates({
      params,
      onSuccess: (response) => {
        setAdvocates(response.advocates);
        setTotalPages(response.totalPages);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    handleGetAdvocates({ params: { page: currentPage } });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (getAdvocatesTimeout.current) {
      clearTimeout(getAdvocatesTimeout.current);
    }
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // only fire onChange if inactive to 1 second
    getAdvocatesTimeout.current = setTimeout(() => {
      handleGetAdvocates({ params: { searchTerm } });
      setCurrentPage(1);
    }, 1000);
  };

  const handlePageChange = (newPage: number) => {
    handleGetAdvocates({ params: { page: newPage, searchTerm } });
    setCurrentPage(newPage);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    handleGetAdvocates({ params: { page: 1 } });
    setCurrentPage(1);
  };

  const specialtiesFormatter = ({
    cellData,
    rowData,
  }: {
    cellData: string[];
    rowData: Advocate;
  }) => {
    return (
      <SpecialtiesCell
        advocateFirstName={rowData.firstName}
        advocateLastName={rowData.lastName}
        specialties={cellData}
      />
    );
  };

  const phoneNumberFormatter = ({ cellData }: { cellData: number }) => {
    return formatPhoneNumber(cellData.toString());
  };

  const columnData = [
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "City", accessor: "city" },
    { label: "Degree", accessor: "degree" },
    {
      label: "Specialties",
      accessor: "specialties",
      formatter: specialtiesFormatter,
    },
    { label: "Years of Experience", accessor: "yearsOfExperience" },
    {
      label: "Phone Number",
      accessor: "phoneNumber",
      formatter: phoneNumberFormatter,
    },
  ];

  return (
    <>
      <div>
        <div>
          <label htmlFor="advocates-search">Search</label>
        </div>
        <Input
          id="advocates-search"
          onChange={handleSearchChange}
          value={searchTerm}
          placeholder="Name, City, etc..."
        />
        <Button onClick={handleResetSearch} className="ml-2">
          Reset
        </Button>
      </div>
      <br />
      <br />
      <div
        className={`flex flex-col gap-4 items-end ${
          loading ? "opacity-50" : ""
        }`}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
        <Table columnData={columnData} data={advocates} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};
