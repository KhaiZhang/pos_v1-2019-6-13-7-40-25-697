'use strict';

describe('pos', () => {

//   it('should print text', () => {

//     const tags = [
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000003-2.5',
//       'ITEM000005',
//       'ITEM000005-2',
//     ];

//     spyOn(console, 'log');

//     printReceipt(tags);

//     const expectText = `***<没钱赚商店>收据***
// 名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
// 名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
// 名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
// ----------------------
// 总计：58.50(元)
// 节省：7.50(元)
// **********************`;

//     expect(console.log).toHaveBeenCalledWith(expectText);
//   });

  it(`should return barcodeWithCount when decodeTag`,() =>{
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const result = decodeTag(tags);
    console.log(result)
    const expectResult = [
    {barcode:'ITEM000001',count:5},
    {barcode:'ITEM000003',count:2.5},
    {barcode:'ITEM000005',count:3}
  ];
    expect(result).toEqual(expectResult);
  })

  it(`should return items when combineItem`,() =>{
    const barcodesWithCount = [
      {barcode:'ITEM000001',count:5},
      {barcode:'ITEM000003',count:2.5},
      {barcode:'ITEM000005',count:3}
    ];
    const result = combineItem(barcodesWithCount);
    const expectResult =[
      { barcode: "ITEM000001",
        count: 5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      { barcode: "ITEM000003", 
        count: 2.5,
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      { barcode: "ITEM000005", 
        count: 3,
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
      ];
    expect(result).toEqual(expectResult);
  })

  it(`should return items when decodeTags`,() =>{
    const barcodesWithCount =  [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const result = decodeTags(barcodesWithCount);
    const expectResult =[
      { barcode: "ITEM000001",
        count: 5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      { barcode: "ITEM000003", 
        count: 2.5,
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      { barcode: "ITEM000005", 
        count: 3,
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
      ];
    expect(result).toEqual(expectResult);
  });

  it('should return items with subtotal when promoteReceiptItems', () => {

    const items = [
      { barcode: "ITEM000001",
        count: 5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      { barcode: "ITEM000003", 
        count: 2.5,
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      { barcode: "ITEM000005", 
        count: 3,
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
      ];
    const allPromotions = loadPromotions();
    const result = promoteReceiptItems(items,allPromotions);
    const expectResult = [
      { barcode: "ITEM000001",
        count: 5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        subtotal: 12.00
      },
      { barcode: "ITEM000003", 
        count: 2.5,
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        subtotal: 37.50
      },
      { barcode: "ITEM000005", 
        count: 3,
        name: '方便面',
        unit: '袋',
        price: 4.50,
        subtotal: 9.00
      }
      ];
    expect(result).toEqual(expectResult);
  });

  it('should return items receiptItems when calculateReceiptItems', () => {

    const items = [
      { barcode: "ITEM000001",
        count: 5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      { barcode: "ITEM000003", 
        count: 2.5,
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      { barcode: "ITEM000005", 
        count: 3,
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
      ];
    const result = calculateReceiptItems(items);
    const expectResult = [
      { barcode: "ITEM000001",
        count: 5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        subtotal: 12.00
      },
      { barcode: "ITEM000003", 
        count: 2.5,
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        subtotal: 37.50
      },
      { barcode: "ITEM000005", 
        count: 3,
        name: '方便面',
        unit: '袋',
        price: 4.50,
        subtotal: 9.00
      }
      ];
    expect(result).toEqual(expectResult);
  });
});
