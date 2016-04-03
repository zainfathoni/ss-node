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
    } else {
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

exports.categoryNode = categoryNode;
exports.productNode = productNode;
exports.anyParentRemains = anyParentRemains;
exports.iterateCategory = iterateCategory;
exports.iterateProduct = iterateProduct;