import { useRef, useState, useEffect} from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";

import Free from "../positions/free";
import Confirmed from "../positions/confirm";
import Busy from "../positions/busy";

const SCHEME = gql`
  query categories($name: String!) {
    categories(name: $name) {
      id
      name
      categoryRoom {
        id
        number
        size
        tel
        ownerFirstName
        ownerLastName
        checkIn
        checkOut
        position
      }
    }
  }
`

function HomeLux() {
  const [rooms,setRooms] = useState('free')
  const [chekker, setChekker] = useState("true");
  let token = window.localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      let objects = {
        token,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objects),
      };
      fetch("http://192.168.1.9:4000/token", requestOptions)
        .then((data) => data.json())
        .then((m) => {
          if(m === false){
            setChekker('false')
          }
        });
    }
  }, []);

  const { data } = useQuery(SCHEME, {
    variables: { name:"Lux"}
  });
  // let newdata

  let changedData = []
  
  if (data) {
    changedData = data.categories[0].categoryRoom;
  }

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

  function Filter(arr, result, position){
    arr.forEach(item=>{
      if(item.position == position){
        result.push(item)
      }
    })
    return result
  }
  let freeCount = []
  Filter(changedData,freeCount,'free')
  let confirmedCount =[]
  Filter(changedData,confirmedCount,'confirmed')
  let busyCount = []
  Filter(changedData,busyCount,'busy')
  
  const freeHover = useRef(null)
  const confirmedHover = useRef(null)
  const busyHover = useRef(null)
  function hoverActive(evt){
    freeHover.current.classList.add('hover')
    confirmedHover.current.classList.remove('hover')
    busyHover.current.classList.remove('hover')
    setRooms('free')
  }
  function confirmedActive(evt){
    freeHover.current.classList.remove('hover')
    confirmedHover.current.classList.add('hover')
    busyHover.current.classList.remove('hover')
    setRooms('confirmed')
  }
  function busyActive(evt){
    freeHover.current.classList.remove('hover')
    confirmedHover.current.classList.remove('hover')
    busyHover.current.classList.add('hover')
    setRooms('busy')
  }
  if (chekker == "false") {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <section className="home">
        <div className="navbar">
          <span>Hotel admistration</span>
        </div>
        <div className="container">
          <div className="homeContent">
            <div className="navbox">
              <ul className="TipList">
                <Link to="/" className="tipListitems">
                  <li className="tipListitems ">Simple</li>
                </Link>
                <Link to="/medium" className="tipListitems">
                  <li className="tipListitems ">Medium</li>
                </Link>
                <Link to="/lux" className="tipListitems">
                  <li className="tipListitems nav_active">Luxuary</li>
                </Link>
              </ul>
            </div>
            <div className="rooms">
              <ul className="_room">
                <li ref={freeHover} className="treeple hover" onClick={hoverActive} >
                  <div className="items item_1">
                    <i className="fas fa-hotel"></i>
                    <div className="right">
                      <p>{freeCount.length}</p>
                      <span>Empty Rooms</span>
                    </div>
                  </div>
                  <span className="link_1">View Details</span>
                </li>
                <li ref={confirmedHover} className="treeple" onClick={confirmedActive}>
                  <div className="items item_2">
                    <i className="far fa-thumbs-up"></i>
                    <div className="right">
                      <p>{confirmedCount.length}</p>
                      <span>Confirmed Bookings</span>
                    </div>
                  </div>
                  <span className="link_2">View Details</span>
                </li>
                <li ref={busyHover} className="treeple" onClick={busyActive}>
                  <div className="items item_3">
                    <i className="far fa-clock"></i>
                    <div className="right">
                      <p>{busyCount.length}</p>
                      <span>Busy Rooms</span>
                    </div>
                  </div>
                  <span className="link_3">View Details</span>
                </li>
              </ul>
              <div className="roomLists">
                <span className="listHeader">Bookings</span>
                <hr />
                <ul className="room_list_order">
                  <li>Code</li>
                  <li>Room</li>
                  <li>Ckeck in</li>
                  <li>Check out</li>
                  <li>Total</li>
                  <li>First Name</li>
                  <li>Last Name</li>
                  <li>Room Phone</li>
                  <li>Take</li>
                </ul>
                {rooms == 'free' && <Free data={changedData} />}
                {rooms == 'confirmed' && <Confirmed data={changedData} />}
                {rooms == 'busy' && <Busy data={changedData} />}
              </div>
              <div ref={is_active} className="modal" onClick={ctive}>
                <div className="register">
                  <div className="isActive" onClick={removeActive}>
                    <i className="fas fa-times"></i>
                  </div>
                  <h1>Room Registration</h1>
                  <form>
                    <label htmlFor="first">First name</label>
                    <input id="first" type="text" />

                    <label htmlFor="last">Last name</label>
                    <input id="last" type="text" />

                    <label htmlFor="room_number">Room number</label>
                    <input id="room_number" type="number" />

                    <div className="checkWrapper">
                      <div className="wrap">
                        <label htmlFor="check_in">Check in</label>
                        <input id="check_in" type="date" />
                      </div>

                      <div className="wrap">
                        <label htmlFor="check_out">Check out</label>
                        <input id="check_out" type="date" />
                      </div>
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeLux;
