export default interface IProfomaItem {
   categoryDescription: string
   items: {
      productId: number
      proformaInfoId: number
      proformaItemId: number
      qty: number
   }[]
   productDescription: string
   product_id: string
   product_stock: {
      1: number
      3: number
      5: number
   }[]
}
