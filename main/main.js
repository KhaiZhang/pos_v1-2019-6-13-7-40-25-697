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
