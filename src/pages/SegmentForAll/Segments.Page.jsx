import Index from '../../components/AgentSegments/Index';
import Logo from '../../assets/logo/Logo_2.png';

export default function SegmentsPageForAll() {
  return (
    <>
      <div className='seg' style={{ margin: '10px 0 40px', padding: "0 20px" }}>
        <div className='text-center'>
          <img style={{
            width: '300px',
            height: '150px',
            objectFit: 'cover',
          }} src={Logo} alt={Logo} />
        </div>
        <h2 className='text-center ' style={{
          padding: '15px 0',
          fontWeight: 'normal'
        }}>شرائح الاقصي</h2>
        <Index />
      </div>
    </>
  )
}
