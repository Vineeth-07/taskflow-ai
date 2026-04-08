import { Link } from "react-router-dom";
function Breadcrumb({ items }: any) {
  return (
    <div className="text-sm text-gray-500 mb-4">
      {items.map((item: any, index: number) => (
        <span key={index}>
          {item.link ? (
            <Link to={item.link} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
          {index < items.length - 1 && "/"}
        </span>
      ))}
    </div>
  );
}
export default Breadcrumb;
