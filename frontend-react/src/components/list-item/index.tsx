import { GroceryItem } from "../../grocery-item";
import { usePurchaseMutation } from "../../app/api";

function ListItem({ id, name, isPurchased }: Partial<GroceryItem>) {
  const [purchase] = usePurchaseMutation();

  if (!id) return null;

  const handleClick = () => {
    purchase(id);
  };

  return (
    <li
      style={{ textDecoration: isPurchased ? "line-through" : undefined }}
      onClick={handleClick}
    >
      {name}
    </li>
  );
}

export default ListItem;
