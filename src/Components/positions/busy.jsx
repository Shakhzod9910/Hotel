
function Busy(props) {
    let news = props.data


    function Filter(arr, result, position){
        arr.forEach(item=>{
          if(item.position == position){
            result.push(item)
          }
        })
        return result
      }
    
      let newdata = []
      Filter(news,newdata,'busy')
  return (
    <>
      <ul>
        {newdata &&
          newdata.map((row) => (
            <li key={row.id}>
              <ul className="room_order">
                <li>{row.number}</li>
                <li>{row.position}</li>
                <li>{row.checkIn}</li>
                <li>{row.checkOut}</li>
                <li>{row.size}</li>
                <li>{row.ownerFirstName}</li>
                <li>{row.ownerLastName}</li>
                <li>{row.tel}</li>
                <li>
                  <button className="teke_btn" >
                    Get free
                  </button>
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Busy