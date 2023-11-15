import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table";

const ColumnFilter = ({ column }) => {
  const { setFilter } = column;
  return (
    <input
      type="text"
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Filter ${column.Header}`}
    />
  );
};

const TableListClassTeacher = () => {
  const [data, setData] = useState([]);
  //const [allClass, setallClass] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassList/${2}`); 
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleRowClick = (row) => {
    console.log('Clicked row data:', row);
    navigate(`/classdetail/${row.classId}`);
  };

  const [columns, setColumns] = useState([
    {
      Header: 'Class Name',
      accessor: 'className',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'Teacher Name',
      accessor: 'teacherName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'CourseName',
      accessor: 'courseName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'NumberStudent',
      accessor: 'numberStudent',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Topic',
      accessor: 'topic',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'QuizzeName',
      accessor: 'quizzeName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Schedule',
      accessor: 'schedule',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Fee',
      accessor: 'fee',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'NumberOfWeek',
      accessor: 'numberOfWeek',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'CreateDate',
      accessor: 'createDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'StartDate',
      accessor: 'startDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'EndDate',
      accessor: 'endDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Status',
      accessor: 'status',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },

  ]);

  // const [apiData, setApiData] = useState([]);
  // useEffect(() => {
  //   // Call your API to get data
  //   fetch(`https://localhost:7169/api/Class/GetTeacherClassList/${2}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <Table columns={columns} data={data} onRowClick={handleRowClick}/>
  );
}

export default TableListClassTeacher;