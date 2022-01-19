import { useRef } from "react"
import { useMutation, gql } from "@apollo/client";

const MUTATION = gql`
mutation changeCategory($room_owner_first_name: String! $room_owner_last_name: String! $room_checkin: String! $room_checkout: String! $room_position: String! $room_id: ID!){
  changeCategory(room_owner_first_name: $room_owner_first_name room_owner_last_name: $room_owner_last_name,room_checkin: $room_checkin,room_checkout: $room_checkout,room_position: $room_position,room_id:$room_id)
}
` 

function Free(props) {

  const [newChange,{data:updateRoom}] = useMutation(MUTATION,{
    update:(cache,data)=>{
      console.log(data);
    }
  })
 
  const firstName = useRef(null)
  const lastName = useRef(null)
  const checkIn = useRef(null)
  const checkOut = useRef(null)
  const rowId = useRef(null)
  const position = useRef(null)

  function submitData(evt){
    evt.preventDefault();
      let firstname = firstName.current.value
      let lastname = lastName.current.value
      let checkin = checkIn.current.value
      let chckout = checkOut.current.value
      let numId = rowId.current.getAttribute('data')
      let pos = position.current.value
      newChange({
        variables:{
          room_owner_first_name: firstname,
          room_owner_last_name: lastname,
          room_checkin: checkin,
          room_checkout: chckout,
          room_position: pos,
          room_id: numId
        }
      })
  }
    
    let news = props.data
    function Filter(arr, result, position){
        arr.forEach(item=>{
          if(item.position == position){
            result.push(item)
          }
        })
        return result
      }
      // console.log(newdata);
    
      let newdata = []
      Filter(news,newdata,'free')

      const is_active = useRef(null);

      const modal_active = (evt) => {
        is_active.current.classList.add("modal_active");
      };
    
      const removeActive = (evt) => {
        is_active.current.classList.remove("modal_active");
      };
    
      const ctive = (evt) => {
        if (evt.target.matches(".modal")) {
          is_active.current.classList.remove("modal_active");
        }
      };

  return (
    <>
      <ul>
        {newdata &&
          newdata.map((row) => (
            <li  key={row.id}>
              <ul className="room_order">
                <li >{row.number}</li>
                <li>{row.position}</li>
                <li>{row.checkIn}</li>
                <li>{row.checkOut}</li>
                <li>{row.size}</li>
                <li>{row.ownerFirstName}</li>
                <li>{row.ownerLastName}</li>
                <li>{row.tel}</li>
                <li>
                  <button ref={rowId} data={row.id}  className="teke_btn" onClick={modal_active} >
                    Take
                  </button>
                </li>
              </ul>
            </li>
          ))}
      </ul>
      <div ref={is_active} className="modal" onClick={ctive}>
                <div className="register">
                  <div className="isActive" onClick={removeActive}>
                    <i className="fas fa-times"></i>
                  </div>
                  <h1>Room Registration</h1>
                  <form onSubmit={submitData}>
                    <label htmlFor="first">First name</label>
                    <input id="first" type="text" ref={firstName} />

                    <label htmlFor="last">Last name</label>
                    <input id="last" type="text" ref={lastName}/>

                    <label htmlFor="position">Last name</label>
                    <select ref={position} id="position">
                      <option value="confirmed">Confirmed</option>
                      <option value="busy">Busy</option>
                    </select>

                    <div className="checkWrapper">
                      <div className="wrap">
                        <label htmlFor="check_in">Check in</label>
                        <input id="check_in" type="date" ref={checkIn}/>
                      </div>

                      <div className="wrap">
                        <label htmlFor="check_out">Check out</label>
                        <input id="check_out" type="date" ref={checkOut}/>
                      </div>
                    </div>
                    <button type="submit" >Submit</button>
                  </form>
                </div>
              </div>
    </>
  );
}

export default Free
