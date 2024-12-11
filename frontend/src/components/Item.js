import { useState } from 'react';

function Item(props) {
    const { item, items, setItems } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedItemName, setEditedItemName] = useState(item.item_name);
    const [editedItemPrice, setEditedItemPrice] = useState(item.item_price);

    // Handle delete operation
    async function deleteItem() {
        await fetch(`http://localhost/api/items/${item.item_id}`, {
            method: 'DELETE',
        });

        const newItems = items.filter((p) => p.item_id !== item.item_id);
        setItems(newItems);
    }

    // Handle update operation
    async function updateItem() {
        const response = await fetch(`http://localhost/api/items/${item.item_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_name: editedItemName,
                item_price: editedItemPrice,
            }),
        });

        if (response.ok) {
            const updatedItem = await response.json();
            const newItems = items.map((c) =>
                c.item_id === updatedItem.item_id ? updatedItem : c
            );
            setItems(newItems);
            setIsEditing(false);
        } else {
            alert('Failed to update item.');
        }
    }

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>{item.item_id}</td>
                    <td>
                        <input
                            type="text"
                            value={editedItemName}
                            onChange={(e) => setEditedItemName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editedItemPrice}
                            onChange={(e) => setEditedItemPrice(e.target.value)}
                        />
                    </td>
                    <td>
                        <button className="button green" onClick={updateItem}>
                            Save
                        </button>
                        <button className="button red" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{item.item_id}</td>
                    <td>{item.item_name}</td>
                    <td>{item.item_price}</td>
                    <td>
                        <button className="button green" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="button red" onClick={deleteItem}>
                            Delete
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Item;
