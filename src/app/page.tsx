"use client";

import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { Table } from "@/components/core/Table";
import { useEffect, useState } from "react";
import { useGetAdvocates } from "@/hooks/useGetAdvocates";
import { LoadingSpinner } from "@/components/core/LoadingSpinner";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  const { getAdvocates, loading } = useGetAdvocates();
  useEffect(() => {
    getAdvocates({
      onSuccess: (response) => {
        setAdvocates(response);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, []);

  let getAdvocatesTimeout: NodeJS.Timeout;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(getAdvocatesTimeout);
    const searchTerm = e.target.value;

    // only fire onChange if inactive to 1 second
    getAdvocatesTimeout = setTimeout(() => {
      getAdvocates({
        params: {
          searchTerm,
        },
        onSuccess: (response) => {
          setAdvocates(response);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }, 1000);
  };

  const onClick = () => {
    getAdvocates({
      onSuccess: (response) => {
        setAdvocates(response);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const columnData = [
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "City", accessor: "city" },
    { label: "Degree", accessor: "degree" },
    { label: "Specialties", accessor: "specialties" },
    { label: "Years of Experience", accessor: "yearsOfExperience" },
    { label: "Phone Number", accessor: "phoneNumber" },
  ];

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <div>
          <label htmlFor="search">Search</label>
        </div>
        <Input onChange={onChange} id="search" />
        <Button onClick={onClick} className="ml-2">
          Reset
        </Button>
      </div>
      <br />
      <br />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table columnData={columnData} data={advocates} />
      )}
    </main>
  );
}
