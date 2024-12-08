import '../styles/Card.css'

const Card = ({ 
  headerLeft, 
  headerRight, 
  bodyTop, 
  bodyCenter, 
  bodyBottom, 
  footerLeft, 
  footerRight,
  isActive,
  onClick 
}) => {
  console.log('Card renderizada, isActive:', isActive)
  return (
    <div 
      className={`card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="card-header">
        <div className='card-header-left'>{headerLeft}</div>
        <div className='card-header-right'>{headerRight}</div>
      </div>

      <div className="card-body">
        <div className='card-body-top'>{bodyTop}</div>
        <div className='card-body-center'>{bodyCenter}</div>
        <div className='card-body-bottom'>{bodyBottom}</div>
      </div>

      <div className="card-footer">
        <div className='card-footer-left'>{footerLeft}</div>
        <div className='card-footer-right'>{footerRight}</div>
      </div>
    </div>
  )
}

export default Card
