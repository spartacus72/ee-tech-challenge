import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useAddItemMutation } from "../../app/api";

function AddItem() {
  const [name, setName] = useState<string>("");
  const [addItem] = useAddItemMutation();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault();
    
    await addItem({ name });
  };

  return (
    <form name="addItemForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="Name"
        placeholder="Enter the item description"
        autoFocus
        onChange={handleChange}
        value={name}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItem;
