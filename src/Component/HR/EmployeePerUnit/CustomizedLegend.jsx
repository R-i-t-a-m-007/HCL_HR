import { FaSquareFull } from "react-icons/fa";
export const CustomizedLegend = (props) => {
    const { payload } = props;
    const colors = ["#002060", "#FFA800","#64A33F"];
    return (
      <div className="flex ">
        {payload.map((entry, index) => (
          <div className="flex flex-row" key={index}>
            <FaSquareFull className="mx-2" size={15} color={colors[index]} />
            <span className="mx-2" key={`item-${index}`}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };
  