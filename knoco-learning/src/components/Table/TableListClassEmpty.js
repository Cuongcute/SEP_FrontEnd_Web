import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
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

const TableListClassEmpty = (props) => {
  const [data, setData] = useState([]);
  //const [allClass, setallClass] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/Class/GetListEmptyClass/${params.courseId}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  function formatAPIDate(apiDate) {
    return new Date(apiDate).toLocaleDateString('en-US');
  }

  const handleRowClick = async (row) => {
    console.log('Clicked row data:', row);
    window.confirm("Are you sure you want to teach this class?") ? navigate(`/classdetail/${row}`) : window.close();
  };

  const handleRowClickn = (row) => {
  };

  const UpdateRequestClass = (classId) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decodedToken = jwtDecode(token);

      const updateRequest = {
        classId: classId,
        teacherId: parseInt(decodedToken.userid, 10)
      }
      fetch('https://localhost:7169/api/Class/RequestClass', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRequest),
      })
        .then((response) => {
          if (response.ok) {
            window.confirm("Are you sure you want to teach this class?") ? navigate(`/classdetail/${classId}`) : window.close();
            toast.success("Successfull !!!");
          }
          else if (!response.ok) {
            toast.error("Failed. Try Again!!!")
            throw new Error('Failed to update');
          }

        })

    }
  }

  const [columns, setColumns] = useState([
    {
      Header: 'Class Name',
      accessor: 'className',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'CourseName',
      accessor: 'courseName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Topic',
      accessor: 'topic',
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
      Cell: ({ row }) => (
        <div>
          {formatAPIDate(row.original.createDate)}
        </div>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Action',
      accessor: '',
      Filter: ColumnFilter, // Custom filter component for courseId column
      disableFilters: true, // Vô hiệu hóa bộ lọc cho cột Button
      // disableSortBy: true,
      Cell: ({ row }) => (
        <button className="btn-table" onClick={() => UpdateRequestClass(row.original.classId)}>
          <FontAwesomeIcon icon={faCheck} /> Choose class
        </button>
      ),
    },
  ]);

  return (
    <Table columns={columns} data={data} onRowClick={handleRowClickn} />
  );
}

export default TableListClassEmpty;