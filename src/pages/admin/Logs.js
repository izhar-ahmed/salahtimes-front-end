import React from 'react';
import DataTable from 'react-data-table-component';
import useLogs from '../../components/admin/useLogs';

const Logs = () => {
  const { logs, loading, error } = useLogs();

  const columns = [
    {
      name: 'User Name',
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      sortable: true,
    },
    {
      name: 'Message',
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => row.createdAt,
      sortable: true,
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Logs</h2>
      <DataTable
        title="Logs"
        columns={columns}
        data={logs}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default Logs;