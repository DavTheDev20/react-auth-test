import './Data.styles.css';

const Data = () => {
  const fakeCustomersData = [
    {
      id: 6589749,
      customer: 'Elon Musk',
      email: 'emusk@tesla_inc.com',
      dateAdded: '12/19/22',
    },
    {
      id: 6589750,
      customer: 'Bill Gates',
      email: 'bgates@microsoft.com',
      dateAdded: '6/13/2016',
    },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Data</h1>
      <table style={{ margin: '3% auto' }}>
        <thead>
          <tr>
            <th>id</th>
            <th>customer</th>
            <th>email</th>
            <th>date added</th>
          </tr>
        </thead>
        <tbody>
          {fakeCustomersData.map((customer, index) => {
            return (
              <tr key={index}>
                <td>{customer.id}</td>
                <td>{customer.customer}</td>
                <td>{customer.email}</td>
                <td>{new Date(customer.dateAdded).toDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
