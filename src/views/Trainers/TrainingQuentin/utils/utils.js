export const propertyNameRefactor = (propertyName) => {
    let newPropertyName = propertyName.replace("$", " - ").replace("_", " ");
    return newPropertyName;
}

export const formatPropertiesArray = (arr) => {
    const newArr = [];
    let count = 0;
    arr.forEach((property) => {
        count++;
        let obj = {
            value: count,
            label: propertyNameRefactor(property),
            name: property,
        }
        newArr.push(obj);
    });

    return newArr;
}