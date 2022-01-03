import {
   Box,
   Container,
   Table,
   TableCaption,
   Tbody,
   Td,
   Tfoot,
   Th,
   Thead,
   Tr,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'

import datas from '../../data/data.json'
import IProfomaItem from '../../interfaces/IProformaItem'

interface IHome {}

const Home: FC<IHome> = () => {
   const [proformaItem, setProformaItem] = useState<IProfomaItem[]>([])

   useEffect(() => {
      const proformaItemParse = datas.proformaItem.map((item) => {
         return {
            ...item,
            items: JSON.parse(item.items),
            product_stock: JSON.parse(item.product_stock),
         }
      })

      setProformaItem(proformaItemParse)
   }, [])

   const getProductStock = ({
      idLocation,
      product_stock,
   }: {
      idLocation: number
      product_stock: any
   }) => {
      const productStock =
         product_stock.find((p: any) => p[`${idLocation}`]) ?? 0

      return productStock[`${idLocation}`] ?? 0
   }

   const getTotal = ({ product_stock }: { product_stock: any }) => {
      const total = datas.location.map((location) =>
         getProductStock({ idLocation: location.id, product_stock })
      )
      return total.reduce((total, num) => total + num, 0)
   }

   const getTotalOrder = (items: any) => {
      return items.reduce((total: number, num: any) => total + num.qty, 0)
   }

   const getPercentage = ({
      product_stock,
      items,
   }: {
      product_stock: any
      items: any
   }) => {
      const totalStock = getTotal({ product_stock: product_stock })
      const totalOrder = getTotalOrder(items)

      return `${((totalOrder / totalStock) * 100).toFixed(2)} %`
   }

   return (
      <Container maxW='container.xl' p={{ base: '25px', md: '50px' }}>
         <Box overflow='auto'>
            <Table variant='simple'>
               <TableCaption>Data PT. Global Prima Textilindo</TableCaption>
               <Thead>
                  <Tr>
                     {datas.location.map((location) => (
                        <Th key={location.id}>{location.name}</Th>
                     ))}
                     <Th>Category</Th>
                     <Th>Product</Th>
                     <Th>Total Stock</Th>
                     <Th>Percent %</Th>
                     <Th>Total Order</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {proformaItem.map((item) => (
                     <Tr key={item.product_id}>
                        {datas.location.map((location) => (
                           <Td key={location.id}>
                              {getProductStock({
                                 idLocation: location.id,
                                 product_stock: item.product_stock,
                              }).toLocaleString()}
                           </Td>
                        ))}
                        <Td>{item.categoryDescription}</Td>
                        <Td>{item.productDescription}</Td>
                        <Td>
                           {getTotal({
                              product_stock: item.product_stock,
                           }).toLocaleString()}
                        </Td>
                        <Td>
                           {getPercentage({
                              product_stock: item.product_stock,
                              items: item.items,
                           })}
                        </Td>
                        <Td>{getTotalOrder(item.items)}</Td>
                     </Tr>
                  ))}
               </Tbody>
               <Tfoot></Tfoot>
            </Table>
         </Box>
      </Container>
   )
}

export default Home
