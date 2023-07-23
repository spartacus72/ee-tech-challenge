import { useGetListQuery } from "../../app/api";
import { GroceryItem } from "../../grocery-item";
import ListItem from "../list-item";

function List() {
  const { data: items = [], isLoading } = useGetListQuery();

  if (isLoading) {
    return <>{"Loading..."}</>;
  }

  return (
    <ul>
      {items.map((i: GroceryItem) => {
        return <ListItem key={i.id} {...i} />;
      })}
    </ul>
  );
}

export default List;
