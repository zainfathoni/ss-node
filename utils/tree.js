function categoryNode(data) {
    return {
        type: 'category',
        data: data,
        children: []
    };
};

function productNode(data) {
    return {
        type: 'product',
        data: data
    };
};

function anyParentRemains(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].parent) {
            return true;
        } else {
            continue
        }
    }
    return false;
};

function iterateCategory(current, item) {
    var data = current.data;
    var children = current.children;

    if (item.parent === data.name) {
        delete item.parent;
        children.push(categoryNode(item));
    } else if (children) {
        for (var i = 0, len = children.length; i < len; i++) {
            iterateCategory(children[i], item);
        }
    }
};

function iterateProduct(current, item) {
    var data = current.data;
    var children = current.children;

    if (item.parent === data.name) {
        delete item.parent;
        children.push(productNode(item));
    } else if (children) {
        for (var i = 0, len = children.length; i < len; i++) {
            iterateProduct(children[i], item);
        }
    }
};

function findCategory(current, name) {
    var data = current.data;
    var children = current.children;

    if (name === data.name) {
        return current;
    } else if (children) {
        for (var i = 0, len = children.length; i < len; i++) {
            var result = findCategory(children[i], name);
            if (result) {
                return result;
            }
        }
    }
};

exports.categoryNode = categoryNode;
exports.productNode = productNode;
exports.anyParentRemains = anyParentRemains;
exports.iterateCategory = iterateCategory;
exports.iterateProduct = iterateProduct;
exports.findCategory = findCategory;