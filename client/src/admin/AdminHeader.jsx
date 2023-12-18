
const AdminHeader = ({title,subTitle}) => {
  return (
    <>
    <article className="border-b border-gray-900/10 pb-5">
        <h2 className="text-2xl font-semibold leading-7 text-[--primary]">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{subTitle}</p>
    </article> 
    </>
  )
}

export default AdminHeader
