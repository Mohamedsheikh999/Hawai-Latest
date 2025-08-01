const RecentUpdates = ({ updates }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-dark-green font-bold mb-4">Recent Updates</h3>
      <ul className="space-y-2">
        {updates.map((item) => (
          <li key={item.id} className="flex items-center">
            <span className="w-2 h-2 bg-light-green rounded-full mr-2"></span>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RecentUpdates;