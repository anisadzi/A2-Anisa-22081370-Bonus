import Item from './Item.js';
import NewItem from './NewItem.js';

function ItemList(props) {
    const { item, items, setItems } = props;

    return (
        <div className="item-list">
            <h2>Items</h2>

            <NewItem items={items} setItems={setItems} item={item} />

            <hr />
            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item) => {
                            return (
                                <Item
                                key={item.item_id}
                                item={item}
                                items={items}
                                setItems={setItems}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ItemList;
