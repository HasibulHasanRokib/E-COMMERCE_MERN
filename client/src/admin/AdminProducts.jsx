import { useEffect, useState } from 'react'
import { AiOutlineSearch} from 'react-icons/ai'
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { OUT_OF_STOCK, TOTAL_CATEGORY, TOTAL_STORE_VALUE, deleteProductById, getAllProducts } from '../features/product/productSlice';
import { SEARCH_PRODUCT } from '../features/product/filterProductSlice';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import StoreInfo from './StoreInfo';
import Table from './ProductsTable';
import AdminHeader from './AdminHeader';

const AdminProducts = () => {
  const [search, setSearch] = useState('')

  const { products, isLoading,totalStoreValue,outOfStock ,category} = useSelector((state) => state.product)
  const { filterProducts } = useSelector((state) => state.filter)
  console.log(products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(()=>{
  dispatch(SEARCH_PRODUCT({products,search}))
  },[dispatch,products,search])

  useEffect(()=>{
    dispatch(TOTAL_STORE_VALUE(products))
    dispatch(OUT_OF_STOCK(products))
    dispatch(TOTAL_CATEGORY(products))
  },[dispatch,products])

  const handleProductDelete =async(id)=> {
    dispatch(deleteProductById(id))
    dispatch(getAllProducts())
  }

  
  const confirmDelete=(id)=>{
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleProductDelete (id)
        },
        {
          label: 'No',
        }
      ]
    }); 
  }


  //pagination
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage=5;
 
  useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filterProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterProducts?.length / itemsPerPage));
  },[itemOffset,itemsPerPage])
 
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterProducts?.length;
    setItemOffset(newOffset);

  }

  return (
    <main className='p-3'>

      <AdminHeader title={'Products Information'} subTitle={'All products there.'}/>
      <StoreInfo products={products} totalStoreValue={totalStoreValue} category={category} outOfStock={outOfStock}/>

      <form className="flex max-md:justify-between items-center rounded-md my-2 shadow-sm bg-white w-full md:w-[225px]">
      <AiOutlineSearch size={30} />
      <input onChange={(e)=>setSearch(e.target.value)} value={search}  className="py-1.5 px-2 rounded-l outline-none  shadow-sm" type="text" name="search" id="search" placeholder="Search..." />
      </form>

      <Table currentItems={currentItems} confirmDelete={confirmDelete}/>
      {isLoading ? <h5 className='my-10 text-center font-bold '><Spinner /></h5> : null}

        <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName='flex items-center my-5 justify-end'
        pageClassName='bg-white shadow-sm p-2 text-xs font-semibold  border'
        activeClassName='bg-blue-500 text-red-600 font-bold'
        previousLinkClassName='bg-white text-sm border p-2 font-semibold'
        nextLinkClassName='bg-white text-sm p-2 border font-semibold'
      />
 
    </main>
  )
}

export default AdminProducts

