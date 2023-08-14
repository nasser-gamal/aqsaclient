
import PageNotFound from '../../assets/404 Error Page not Found with people connecting a plug-bro.png';

export default function Page404() {
  return (
    <div className='text-center'>
      <img style={{
        width: '100%',
        height: '500px',
        objectFit: 'contain'
      }} src={PageNotFound} alt={PageNotFound} />
      <a style={{
        textDecoration: 'underline',
        color: 'blue',
        fontSize: '22px',
      }} href={import.meta.env.VITE_API_CLIENT_URL}>الاقصي للدفع الالكتروني</a>
    </div>
  )
}
