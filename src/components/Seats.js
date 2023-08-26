import React, { useState } from "react";

export default function Seats(props) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          console.log("tick",props.ticketId)
          // console.log("pro",props.seatNo.slice(2))
          // setIsActive(!isActive);
          // if (!isActive ) {
            if (props.seats.length<5) {
              setIsActive(true);
              props.setSeats(props.seats.concat(props.seatNo));
              // props.setSeats(props.seats.concat(props.ticketId));
            } else {
            setIsActive(false);
            props.setSeats(props.seats.filter((seat) => seat !== props.seatNo));
            //TICKEDID = MOVIE-THEATRE-SEAT
          }
        }}
        className={`cursor-pointer w-7 h-6 rounded-t-full ${
          isActive ? "bg-green-500" : "bg-gray-800"
        }  m-1 text-center text-[12px] flex items-center justify-center`}
      >
        {props.seatNo.slice(2)}
      </div>
    </div>
  );
}
