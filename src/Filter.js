export const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      Filter by: 
      <input value={filter} onChange={(event) => setFilter(event.target.value)} />
    </div>
  );
};
