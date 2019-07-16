'use strict';

const decodeTag = tags =>{
    return tags.reduce( (barcodeWithCount,currentValue) => {
        currentValue = currentValue.indexOf('-')!=-1? {barcode : currentValue.split('-')[0],
        count : parseFloat(currentValue.split('-')[1])} : {barcode : currentValue,count : 1};
        barcodeWithCount.find(value => value.barcode === currentValue.barcode)?
        barcodeWithCount.find(value => value.barcode === currentValue.barcode).count+=currentValue.count:
        barcodeWithCount.push(currentValue);
        return barcodeWithCount;
    },[])
}

const combineItem = barcodesWithCount => {
    const allItems = loadAllItems();
    return barcodesWithCount.map(currentValue => {
        const findItem = allItems.find(item => item.barcode === currentValue.barcode);
        currentValue.name = findItem.name;
        currentValue.unit = findItem.unit;
        currentValue.price = findItem.price;
        return currentValue; 
    });
}

const decodeTags = tags =>{
    return combineItem(decodeTag(tags));
}

const promoteReceiptItems = (items,allPromotions) => {
    return items.map(item => {
         allPromotions.find(promotion => promotion.type === 'BUY_TWO_GET_ONE_FREE').barcodes
        .includes(item.barcode) && item.count > 2 ? item.subtotal = (item.count-1) * item.price:
        item.subtotal = item.count * item.price;
        return item;
    });
}

const calculateReceiptItems = items => {
    const allPromotions = loadPromotions();
    return promoteReceiptItems(items,allPromotions);
}

const calculateReceiptTotal = receiptItems => {
    let total=0;
    for (let item of receiptItems) {
        total += item.subtotal;
    }
    return total;
}

const calculateReceiptSaving = receiptItems => {
    let saving=0;
    for (let item of receiptItems) {
        saving += item.count * item.price - item.subtotal;
    }
    return saving;
}

const calculateReceipt = receiptItems => {
    const receipt ={};
    receipt.receiptItems = receiptItems;
    receipt.total = calculateReceiptTotal(receiptItems);
    receipt.saving = calculateReceiptSaving(receiptItems);
    return receipt;
}

const renderReceipt = receipt => {
    let result = `***<没钱赚商店>收据***\n`;
    for(let item of receipt.receiptItems){
        result = result + `名称：${item.name}，数量：${item.count}${item.unit}，单价：${(item.price.toFixed(2))}(元)，小计：${item.subtotal.toFixed(2)}(元)\n`;
    }
    result = result + `----------------------\n总计：${receipt.total.toFixed(2)}(元)\n节省：${receipt.saving.toFixed(2)}(元)\n**********************`;
    return result;
}

const printReceipt = tags =>{
    return renderReceipt(calculateReceipt(calculateReceiptItems(decodeTags(tags))));
}
