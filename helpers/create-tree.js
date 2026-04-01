function createTree(arr, parent_id = "") {
    const tree = [];
    arr.forEach(item => {
        if (item.parent_id === parent_id) {
            const newItem = item;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);

        }
    });
    return tree;
}
module.exports.createT = (arr) => {
    const tree1 = createTree(arr);
    return tree1;
}
